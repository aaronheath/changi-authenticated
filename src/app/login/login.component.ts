import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthenticated;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.auth.authenticated.subscribe(authenticated => this.isAuthenticated = authenticated);

    this.createForm();
  }

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
