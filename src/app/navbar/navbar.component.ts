import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSubNav = false;


  constructor() { }

  ngOnInit() {
  }

  mouseenter(a, b) {
    console.log('mouseenter', a, b)
    this.showSubNav = true;
  }

  mouseleave(a, b) {
    console.log('mouseleave', a, b)
    this.showSubNav = false;
  }
}
