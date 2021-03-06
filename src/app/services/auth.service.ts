import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {addMinutes, addSeconds, isBefore, isPast} from 'date-fns';
import {environment as ENV} from 'env';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {SessionStorageService} from './session-storage.service';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface OAuthParams {
  grant_type: 'password' | 'refresh_token';
  client_id: string;
  client_secret: string;
  scope: string;
  username?: string;
  password?: string;
  refresh_token?: string;
  [param: string]: string | string[];
}

export interface LatestAttemptMessage {
  status: 'in-progress' | 'success' | 'failed';
  msg: string;
}

@Injectable()
export class AuthService {
  static storageName = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiresIn: 'expiresIn',
  };

  authenticated = new BehaviorSubject(null);
  accessTokenSubject = new Subject<string>();
  loginAttemptMessage = new Subject<LatestAttemptMessage>();

  private clientId: string = ENV.OAUTH.CLIENTID;
  private clientSecret: string = ENV.OAUTH.CLIENTSECRET;
  private url = `${ENV.OAUTH.BASE}${ENV.OAUTH.PATH}`;
  private accessToken: string;
  private refreshToken: string;
  private expiresIn: number;
  private expiresAt: Date;

  constructor(private http: HttpClient, private storage: SessionStorageService) {
    this.hydrateTokens();
  }

  authenticate(username: string, password: string): void {
    this.loginAttemptMessage.next({status: 'in-progress', msg: 'Attempting login...'});

    const params: OAuthParams = {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: '',
      username,
      password,
    };

    this.call(params);
  }

  pushAccessToken(): void {
    if (this.shouldRefresh()) {
      return this.refresh();
    }

    this.accessTokenSubject.next(this.accessToken);
  }

  refresh(): void {
    const params: OAuthParams = {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
      scope: '',
    };

    this.call(params);
  }

  private call(params: OAuthParams): void {
    const body = new HttpParams({fromObject: params});

    const options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

    this.http
      .post(this.url, body.toString(), options)
      .subscribe((data: TokenResponse) => {
        this.setTokenProps(data.access_token, data.refresh_token, data.expires_in);

        this.storeTokens();

        this.setAuthenticated();

        if (params.grant_type === 'password') {
          this.loginAttemptMessage.next({status: 'success', msg: 'Successfully logged in'});
        }
      }, response => {
        if (params.grant_type === 'password') {
          this.loginAttemptMessage.next({status: 'failed', msg: 'Login failed due to incorrect username / password'});
        }
      });
  }

  private setAuthenticated(): void {
    if (ENV.OAUTH.FORCE_AUTHENTICATED) {
      return this.authenticated.next(true);
    }

    if (!this.accessToken || !this.refreshToken || !this.expiresAt) {
      return this.authenticated.next(false);
    }

    // If expires is in the past
    if (isPast(this.expiresAt)) {
      return this.authenticated.next(false);
    }

    // Otherwise return true
    return this.authenticated.next(true);
  }

  shouldRefresh(): boolean {
    if (!this.authenticated.value) {
      return false;
    }

    // Refresh if within 30 min of expiry
    return isBefore(this.expiresAt, addMinutes(new Date, 30));
  }

  logout(): void {
    // Clear local storage and class properties
    this.accessToken = this.refreshToken = this.expiresIn = this.expiresAt = undefined;

    this.clearTokens();

    this.setAuthenticated();
  }

  private storeTokens(): void {
    this.storage.set(AuthService.storageName.accessToken, this.accessToken || null);
    this.storage.set(AuthService.storageName.refreshToken, this.refreshToken || null);
    this.storage.set(AuthService.storageName.expiresIn, this.expiresIn || null);
  }

  private clearTokens(): void {
    this.storage.remove(AuthService.storageName.accessToken);
    this.storage.remove(AuthService.storageName.refreshToken);
    this.storage.remove(AuthService.storageName.expiresIn);
  }

  private hydrateTokens(): void {
    const accessToken = this.storage.fetch(AuthService.storageName.accessToken);
    const refreshToken = this.storage.fetch(AuthService.storageName.refreshToken);
    const expiresIn = +this.storage.fetch(AuthService.storageName.expiresIn);

    if (accessToken && refreshToken && expiresIn) {
      this.setTokenProps(accessToken, refreshToken, expiresIn);
    }

    this.setAuthenticated();

    if (!this.authenticated.value) {
      this.logout();
    }
  }

  private setTokenProps(accessToken: string, refreshToken: string, expiresIn: number): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.expiresAt = addSeconds(new Date(), this.expiresIn);

    this.accessTokenSubject.next(this.accessToken);
  }
}
