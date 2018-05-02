import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AuthService} from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import {AuthGuard} from './auth.guard';
import { TestComponent } from './test/test.component';
import {RoutingModule} from './routing/routing.module';
import {SessionStorageService} from './session-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    AuthService,
    SessionStorageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
