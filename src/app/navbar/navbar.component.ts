import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSubNavOf: string | null;
  pointerOver: string | null;
  timeout = 300;

  config = [
    {
      key: 'hosts',
      text: 'Hosts',
      subnav: [
        {
          text: 'Udoo',
          route: {},
        },
        {
          text: 'XPS',
          route: {},
        }
      ],
    },
    {
      key: 'other',
      text: 'Other',
      subnav: [
        {
          text: 'Other Again',
          route: {},
        }
      ]
    },
    {
      key: 'none',
      text: 'None',
      route: {},
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  async primaryMouseEnter(key) {
    this.pointerOver = key;

    await this.sleep();

    if(this.pointerOver === key) {
      this.showSubNavOf = key;
    }
  }

  async primaryMouseLeave() {
    this.pointerOver = null;

    await this.sleep();

    if(!this.pointerOver) {
      this.showSubNavOf = null;
    }
  }

  secondaryMouseEnter() {
    this.pointerOver = 'secondary';
  }

  async secondaryMouseLeave() {
    this.pointerOver = null;

    await this.sleep();

    if(!this.pointerOver) {
      this.showSubNavOf = null;
    }
  }

  async sleep() {
    return await new Promise(resolve => setTimeout(() => resolve(), this.timeout));
  }

  subNavKey(item) {
    return !item.subnav || !item.subnav.length ? null : item.key;
  }

  get subnav() {
    return this.config.find(item => item.key === this.showSubNavOf).subnav;
  }
}
