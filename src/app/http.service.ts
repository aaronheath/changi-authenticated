import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private auth: AuthService) {
    //
  }

  get(url: string, options): Subject {
    const subject = new Subject();

    this.auth.accessTokenSubject.subscribe((accessToken) => {
      if(options.headers) {
        // Has headers defined
      }

      // TODO just for dev
      options = {headers: {Authorization: `Bearer ${accessToken}`}};

      this.http.get(url, options).subscribe(response => subject.next(response), error);
    });

    return subject;
  }
}
