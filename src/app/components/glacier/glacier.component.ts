import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import {GlacierService} from '../../services/glacier.service';
import {GlacierArchiveWrapper} from '../../wrappers/glacier-archive.wrapper';

@Component({
  selector: 'app-glacier',
  templateUrl: './glacier.component.html',
  styleUrls: ['./glacier.component.scss'],
})
export class GlacierComponent implements OnInit {
  hostName: string;
  fetching = true;
  latest: GlacierArchiveWrapper[] = [];
  latestSub: Subscription;

  constructor(private title: Title, private glacier: GlacierService) {
    //
  }

  ngOnInit() {
    this.title.setTitle('Glacier Archives');

    this.glacier.fetchLatest();

    this.latestSub = this.glacier.latest.subscribe(archives => {
      this.latest = archives || [];
      this.fetching = false;
    });
  }
}
