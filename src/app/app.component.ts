
import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService) {
    // this.auth.authenticate('aaron@aaronheath.com', 'password');

    this.auth.authenticated.subscribe(authenticated => this.isAuthenticated = authenticated);
  }

  title = 'app';
  isAuthenticated;


}
