import {Subscription} from 'rxjs/Subscription';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authenticatedSub: Subscription;
  isAuthenticated: boolean | null;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    //
  }

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
    this.auth.authenticate(this.loginForm.value.username, this.loginForm.value.password);
  }
}
