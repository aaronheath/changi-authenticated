import {addMinutes, addSeconds, isBefore, isPast} from 'date-fns';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SessionStorageService} from './session-storage.service';
import {environment as env} from '../environments/environment'; // TODO simplify this path as it's commonly used

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class AuthService {
  static storageName = {
    accessToken: 'accessToken',
    refreshToken: 'accessToken',
    expiresIn: 'expiresIn',
  };

  authenticated = new BehaviorSubject(null);

  private clientId = env.oauth.clientId;
  private clientSecret = env.oauth.clientSecret;
  private path = env.oauth.path;
  private accessToken: string;
  private refreshToken: string;
  private expiresIn: number;
  private expiresAt: Date;

  constructor(private http: HttpClient, private storage: SessionStorageService) {
    this.hydrateTokens();
  }

  authenticate(username: string, password: string): void {
    const params = {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: '',
      username,
      password,
    };

    this.call(params);
  }

  async accessToken() {
    if(this.shouldRefresh()) {
      // TODO think we're going to need to distribute accessToken via Subject
      this.refresh();
    }
  }

  refresh() {
    const params = {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
      scope: '',
    };

    this.call(params);
  }

  private call(params) {
    const body = new HttpParams({fromObject: params});

    const options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

    this.http
      .post(this.path, body.toString(), options)
      .subscribe((data: TokenResponse) => {
        this.setTokenProps(data.access_token, data.refresh_token, data.expires_in);

        this.storeTokens();

        this.setAuthenticated();
      });
  }

  private setAuthenticated() {
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

  private storeTokens() {
    this.storage.set(AuthService.storageName.accessToken, this.accessToken || null);
    this.storage.set(AuthService.storageName.refreshToken, this.refreshToken || null);
    this.storage.set(AuthService.storageName.expiresIn, this.expiresIn || null);
  }

  private clearTokens() {
    this.storage.remove(AuthService.storageName.accessToken);
    this.storage.remove(AuthService.storageName.refreshToken);
    this.storage.remove(AuthService.storageName.expiresIn);
  }

  private hydrateTokens() {
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

  private setTokenProps(accessToken: string, refreshToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.expiresAt = addSeconds(new Date(), this.expiresIn);
  }
}
