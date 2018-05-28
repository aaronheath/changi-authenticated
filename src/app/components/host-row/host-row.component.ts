import {Component, Input, OnInit} from '@angular/core';
import {HostWrapper} from '../../wrappers/host.wrapper';

@Component({
  selector: '[app-host-row]',
  templateUrl: './host-row.component.html',
  styleUrls: ['./host-row.component.scss'],
})
export class HostRowComponent implements OnInit {
  @Input() hosts: HostWrapper[] = [];
  @Input() showHostColumn = true;
  @Input() fetching = false;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  statusCss(status): string {
    const map = {
      high: 'text-red',
      medium: 'text-orange',
      low: 'text-green',
    };

    return map[status];
  }

  get showFetching(): boolean {
    return this.fetching && !this.hosts.length;
  }

  get showNothingToDisplay(): boolean {
    return !this.hosts.length && !this.fetching;
  }
}
