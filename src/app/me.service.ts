import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeService {

  constructor(private http: HttpClient) { }

}
