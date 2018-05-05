import {Subscription} from 'rxjs/Subscription';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService, LatestAttemptMessage} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authenticatedSub: Subscription;
  loginAttemptMessageSub: Subscription;
  isAuthenticated: boolean | null;
  loginForm: FormGroup;
  loginAttemptMessage: LatestAttemptMessage;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title
  ) {
    //
  }

  ngOnInit() {
    this.authenticatedSub = this.auth.authenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;

      if (this.isAuthenticated) {
        this.router.navigate(['/']);
      }
    });

    this.loginAttemptMessageSub = this.auth.loginAttemptMessage.subscribe(msg => {
      this.loginAttemptMessage = msg;
    });

    this.createForm();

    this.title.setTitle('Login');
  }

  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
    this.loginAttemptMessageSub.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.auth.authenticate(this.loginForm.value.username, this.loginForm.value.password);
  }

  get formInvalid() {
    return this.loginForm.status === 'INVALID';
  }
}
