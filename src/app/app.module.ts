import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';

// Components
import {AppComponent} from './app.component';
import {GlacierRowComponent} from './components/glacier-row/glacier-row.component';
import {GlacierComponent} from './components/glacier/glacier.component';
import {HomeComponent} from './components/home/home.component';
import {HostRowComponent} from './components/host-row/host-row.component';
import {HostComponent} from './components/host/host.component';
import {IndividualGlacierVaultComponent} from './components/individual-glacier-vault/individual-glacier-vault.component';
import {IndividualHostComponent} from './components/individual-host/individual-host.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {NavbarComponent} from './components/navbar/navbar.component';

// Services
import {AuthService} from './services/auth.service';
import {GlacierService} from './services/glacier.service';
import {HostService} from './services/host.service';
import {HttpService} from './services/http.service';
import {MeService} from './services/me.service';
import {SessionStorageService} from './services/session-storage.service';

// Guards
import {AuthGuard} from './guards/auth.guard';

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
    IndividualHostComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    HostComponent,
    HostRowComponent,
    GlacierComponent,
    GlacierRowComponent,
    IndividualGlacierVaultComponent,
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
    GlacierService,
    HttpService,
    HostService,
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
