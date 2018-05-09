import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

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
  faExclamationCircle,
  faSpinnerThird,
  faTimesCircle,
} from '@fortawesome/fontawesome-pro-light';

library.add(
  faExclamationCircle,
  faSpinnerThird,
  faTimesCircle,
);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
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
  ]
})
export class AppModule {
  //
}
