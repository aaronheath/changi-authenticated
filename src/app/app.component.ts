
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.auth.authenticated.subscribe(authenticated => this.isAuthenticated = authenticated);

    this.createForm();
  }

  title = 'app';
  isAuthenticated;

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log('submitting', this.loginForm.value)

    this.auth.authenticate(this.loginForm.value.username, this.loginForm.value.password);
  }
}
