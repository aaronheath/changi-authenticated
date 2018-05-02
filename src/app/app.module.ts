import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {AuthService} from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import {AuthGuard} from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { TestComponent } from './test/test.component';
import {AuthRoutingModule} from './auth-routing/auth-routing.module';
import {SessionStorageService} from './session-storage.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    AuthComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule
    // RouterModule.forRoot(routes, {enableTracing: true}),
  ],
  providers: [
    AuthService,
    SessionStorageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
