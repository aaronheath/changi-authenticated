import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class MeService {
  constructor(private http: HttpService) {
    //
  }

  fetch() {
    this.http.get('/api/me').subscribe(response => {
      console.log('me fetch response', response);
    });
  }
}
