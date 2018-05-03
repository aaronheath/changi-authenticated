import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
    //
  }
}
