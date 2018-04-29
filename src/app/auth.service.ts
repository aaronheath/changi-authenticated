import {addMinutes, addSeconds, isBefore, isPast} from 'date-fns';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class AuthService {
  authenticated = new BehaviorSubject(false);
  private clientId = '1';
  private clientSecret = 'GybhV8f3Xufus7AKU4h8ghWsEqusoInpiKc0Y3wL';
  private path = 'https://api.ahdc.test/oauth/token';
  private accessToken: string;
  private refreshToken: string;
  private expiresIn: number;
  private expiresAt: Date;

  constructor(private http: HttpClient) {
    //
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
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.expiresIn = data.expires_in;
        this.expiresAt = addSeconds(new Date(), this.expiresIn);

        this.setAuthenticated();
      });
  }

  private setAuthenticated() {
    if(!this.accessToken || !this.refreshToken || !this.expiresAt) {
      return this.authenticated.next(false);
    }

    // If expires is in the past
    if(isPast(this.expiresAt)) {
      return this.authenticated.next(false);
    }

    // Otherwise return true
    return this.authenticated.next(true);
  }

  shouldRefresh(): boolean {
    if(!this.authenticated.value) {
      return false;
    }

    // Refresh if within 30 min of expiry
    return isBefore(this.expiresAt, addMinutes(new Date, 30));
  }
}
