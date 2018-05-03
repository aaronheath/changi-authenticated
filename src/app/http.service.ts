import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
    //
  }

  get(url: string, options) {
    if(options.headers) {
      // Has headers defined
    }

    return this.http.get(url, options);
  }
}
