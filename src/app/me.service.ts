import {Injectable} from '@angular/core';
import {environment as ENV} from 'env';
import {Subject} from 'rxjs/Subject';
import {HttpService} from './http.service';

export interface Me {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class MeService {
  base: string = ENV.OAUTH.BASE;
  subject = new Subject<Me>();

  constructor(private http: HttpService) {
    //
  }

  fetch(): void {
    this.http.get(`${this.base}/api/me`)
      .subscribe(response => this.subject.next(response));
  }
}
