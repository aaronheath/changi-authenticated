import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HostService} from '../../services/host.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent implements OnInit {
  hostName: string;
  fetching = true;
  latest = [];
  latestSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private title: Title, private host: HostService) {
    //
  }

  ngOnInit() {
    this.title.setTitle('All Hosts');

    this.host.fetchLatest();

    this.latestSub = this.host.latest.subscribe(hosts => {
      this.latest = hosts || [];
      this.fetching = false;
    });
  }
}
