import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

interface HeadersObj {
  Authorization: string;
  [header: string]: string | string[];
}

interface OptionsWithAuthorization {
  headers: HttpHeaders | HeadersObj;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private auth: AuthService) {
    //
  }

  get(url: string, useOAuth = true, options?): Subject<any> {
    const subject = new Subject();

    const method = useOAuth ? 'callWithAccessToken' : 'callWithoutAccessToken';

    this[method]('httpGet', subject, url, options);

    return subject;
  }

  private httpGet(subject: Subject<any>, url: string, options?: {}): void {
    this.http.get(url, options)
      .subscribe(
        response => subject.next(response),
        error => console.error(error)
      );
  }

  private callWithAccessToken(method, subject, url, options) {
    this.auth.accessTokenSubject.subscribe(accessToken => {
      options = this.injectAuthorization(accessToken, options);

      this[method](subject, url, options);
    });

    this.auth.pushAccessToken();
  }

  private callWithoutAccessToken(method, subject, url, options) {
    this[method](subject, url, options);
  }

  private injectAuthorization(
    accessToken: string,
    options?: OptionsWithAuthorization
  ): OptionsWithAuthorization {
    const Authorization = `Bearer ${accessToken}`;

    if(!options) {
      return {headers: {Authorization}};
    }

    if(!options.headers) {
      options.headers = {Authorization};

      return options;
    }

    if(options.headers instanceof HttpHeaders) {
      options.headers.set('Authorization', Authorization);

      return options;
    }

    options.headers.Authorization = Authorization;

    return options;
  }
}
