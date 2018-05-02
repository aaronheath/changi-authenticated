import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from '../test/test.component';
import {LoginComponent} from '../login/login.component';
import {LogoutComponent} from '../logout/logout.component';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'test', component: TestComponent},
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule { }