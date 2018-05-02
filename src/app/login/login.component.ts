import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isAuthenticated;
  authenticatedSub;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.authenticatedSub = this.auth.authenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;

      if (this.isAuthenticated) {
        this.router.navigate(['/']);
      }
    });

    this.createForm();
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    console.log('submitting', this.loginForm.value);

    this.auth.authenticate(this.loginForm.value.username, this.loginForm.value.password);
  }
}
