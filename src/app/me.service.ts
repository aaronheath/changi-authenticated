import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class MeService {
  constructor(private http: HttpService) {
    //
  }
}
