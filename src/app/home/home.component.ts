import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {format} from 'date-fns';
import {Me, MeService} from '../me.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

  get random() {
    return format(new Date, 'YYYYMMDDHHmm');
  }
}
