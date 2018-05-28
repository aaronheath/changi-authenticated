import {Injectable} from '@angular/core';
import {environment as ENV} from 'env';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HostWrapper} from '../wrappers/host.wrapper';
import {HttpService} from './http.service';

export interface Pagination {
  current_page: number;
  total_pages: number;
}

interface Host {
  items: HostWrapper[];
  pagination: Pagination;
}

interface ByHostname {
  [key: string]: BehaviorSubject<Host | null>;
}

@Injectable()
export class HostService {
  latest = new BehaviorSubject(null);
  byHostname: ByHostname = {};

  constructor(private http: HttpService) {
    //
  }

  fetchLatest(): void {
    const url = `${ENV.OAUTH.BASE}/api/heartbeat/latest`;

    this.http.get(url).subscribe((response) => {
      this.latest.next(response.data.map(item => HostWrapper.create(item)));
    });
  }

  fetchByHostname(hostname: string, page: number = 1): void {
    const url = `${ENV.OAUTH.BASE}/api/heartbeat?filter[hostname]=${hostname}&page[number]=${page}`;

    if (!this.byHostname[hostname]) {
      this.byHostname[hostname] = new BehaviorSubject(null);
    }

    const sub = this.http.get(url).subscribe((response) => {
      this.byHostname[hostname].next({
        items: response.data.map(item => HostWrapper.create(item)),
        pagination: response.meta.pagination,
      });

      sub.unsubscribe();
    });
  }
}
