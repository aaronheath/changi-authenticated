import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {HomeComponent} from '../home/home.component';
import {HostComponent} from '../host/host.component';
import {LoginComponent} from '../login/login.component';
import {LogoutComponent} from '../logout/logout.component';

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
          {path: ':name', component: HostComponent},
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
