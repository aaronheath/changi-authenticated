import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {HostComponent} from '../components/host/host.component';
import {IndividualHostComponent} from '../components/individual-host/individual-host.component';
import {LoginComponent} from '../components/login/login.component';
import {LogoutComponent} from '../components/logout/logout.component';
import {AuthGuard} from '../guards/auth.guard';

interface NavbarSubNavInterface {
  text: string;
  route: any[] | string;
}

interface NavbarRouteInterface {
  key?: string;
  text: string;
  route?: any[] | string;
  subnav?: NavbarSubNavInterface[];
}

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // Authenticated Routes
      {path: '', component: HomeComponent}, // pathMatch: 'full'
      {
        path: 'host',
        children: [
          {path: '', component: HostComponent},
          {path: ':name', component: IndividualHostComponent},
        ],
      },
    ],
  },
];

export const navbar: NavbarRouteInterface[] = [
  {
    key: 'hosts',
    text: 'Hosts',
    subnav: [
      {
        text: 'All',
        route: ['/host'],
      },
      {
        text: 'Udoo',
        route: ['/host', 'udoo'],
      },
      {
        text: 'XPS',
        route: ['/host', 'xps'],
      },
    ],
  },
  {
    text: 'Countdown',
    route: 'http://countdown.aaronheath.io/',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutingModule {
  //
}
