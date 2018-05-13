import {Component, OnInit} from '@angular/core';
import {navbar} from '../routing/routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSubNavOf: string | null;
  pointerOver: string | null;
  timeout = 300;
  config = navbar;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  subNavKey(item) {
    return !item.subnav || !item.subnav.length ? null : item.key;
  }

  get subNav() {
    return this.config.find(item => item.key === this.showSubNavOf).subnav;
  }

  isRelLink(link) {
    return link.route && Array.isArray(link.route);
  }

  isHrefLink(link) {
    return !!link.route;
  }

  async primaryMouseEnter(key) {
    this.pointerOver = key;

    await this.sleep();

    if (this.pointerOver === key) {
      this.showSubNavOf = key;
    }
  }

  async primaryMouseLeave() {
    this.pointerOver = null;

    await this.sleep();

    if (!this.pointerOver) {
      this.showSubNavOf = null;
    }
  }

  secondaryMouseEnter() {
    this.pointerOver = 'secondary';
  }

  async secondaryMouseLeave() {
    this.pointerOver = null;

    await this.sleep();

    if (!this.pointerOver) {
      this.showSubNavOf = null;
    }
  }

  private async sleep() {
    return await new Promise(resolve => setTimeout(() => resolve(), this.timeout));
  }
}
