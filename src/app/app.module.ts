import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HostComponent} from './host/host.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {NavbarComponent} from './navbar/navbar.component';

// Services
import {AuthService} from './auth.service';
import {HttpService} from './http.service';
import {MeService} from './me.service';
import {SessionStorageService} from './session-storage.service';

// Guards
import {AuthGuard} from './auth.guard';

// Routes
import {RoutingModule} from './routing/routing.module';

// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faHome as faSolidHome,
} from '@fortawesome/fontawesome-pro-solid';

import {
  faExclamationCircle,
  faSignOut as faLightSignOut,
  faSpinnerThird,
  faTimesCircle,
} from '@fortawesome/fontawesome-pro-light';

library.add(
  faExclamationCircle,
  faLightSignOut,
  faSpinnerThird,
  faSolidHome,
  faTimesCircle
);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    HostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthService,
    HttpService,
    MeService,
    SessionStorageService,
    AuthGuard,
    Title,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  //
}
