import {Component, OnInit} from '@angular/core';
import {Me, MeService} from '../me.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model: Me;

  constructor(private me: MeService, private title: Title) {
    //
  }

  ngOnInit() {
    this.me.subject.subscribe(me => this.model = me);

    this.me.fetch();

    this.title.setTitle('Home');
  }
}
