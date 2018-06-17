import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AuthService} from './auth.service';

interface HeadersObj {
  Authorization: string;
  [header: string]: string | string[];
}

interface OptionsWithAuthorization {
  headers: HttpHeaders | HeadersObj;
}

interface ResponseData {
  [key: string]: any;
}

interface ResponseSchema {
  status: 'success' | 'error';
  data?: ResponseData | string;
  msg?: ResponseData | string;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private auth: AuthService) {
    //
  }

  get(url: string, useOAuth = true, options?): Subject<any> {
    const subject = new Subject<ResponseData | string>();

    const method = useOAuth ? 'callWithAccessToken' : 'callWithoutAccessToken';

    this[method]('httpGet', subject, url, options);

    return subject;
  }

  private httpGet(subject: Subject<any>, url: string, options?: {}): void {
    this.http.get(url, options)
      .subscribe(
        this.handleHttpSuccessResponse(subject),
        error => console.error('HTTP GET ERROR', error)
      );
  }

  private handleHttpSuccessResponse(subject: Subject<ResponseData | string>) {
    return (response: ResponseSchema) => {
      if (response instanceof Blob) {
        window.location.href = window.URL.createObjectURL(response);

        // TODO improve support to read headers and to use correct filename into download.
        // https://stackoverflow.com/questions/45505619/angular-4-3-3-httpclient-how-get-value-from-the-header-of-a-response
        // saveData(response, 'testing.txt');
      } else {
        response.status === 'success' ? subject.next(response) : subject.error(response.msg);
      }
    };
  }

  private callWithAccessToken(method, subject, url, options) {
    const sub = this.auth.accessTokenSubject.subscribe(accessToken => {
      options = this.injectAuthorization(accessToken, options);

      this[method](subject, url, options);

      sub.unsubscribe();
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

    if (!options) {
      return {headers: {Authorization}};
    }

    if (!options.headers) {
      options.headers = {Authorization};

      return options;
    }

    if (options.headers instanceof HttpHeaders) {
      options.headers.set('Authorization', Authorization);

      return options;
    }

    options.headers.Authorization = Authorization;

    return options;
  }
}
