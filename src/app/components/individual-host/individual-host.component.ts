import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HostService, Pagination} from '../../services/host.service';
import {HostWrapper} from '../../wrappers/host.wrapper';

@Component({
  selector: 'app-individual-host',
  templateUrl: './individual-host.component.html',
  styleUrls: ['./individual-host.component.scss'],
})
export class IndividualHostComponent implements OnInit {
  hostname: string;
  fetching = true;
  heartbeats: HostWrapper[] = [];
  pagination: Pagination;
  heartbeatsSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private title: Title, private host: HostService) {
    //
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hostname = params.get('name');

      this.title.setTitle(this.hostname);
    });

    this.host.fetchByHostname(this.hostname);

    this.heartbeatsSub = this.host.byHostname[this.hostname].subscribe(hosts => {
      if (!hosts) {
        return;
      }

      this.heartbeats = hosts.items;
      this.pagination = hosts.pagination;
      this.fetching = false;
    });
  }

  get paginationSet(): boolean {
    return !!this.pagination;
  }

  get currentPage(): number | void {
    if (!this.paginationSet) {
      return;
    }

    return this.pagination.current_page;
  }

  get totalPages(): number | void {
    if (!this.paginationSet) {
      return;
    }

    return this.pagination.total_pages;
  }

  get hasNext(): boolean {
    if (!this.paginationSet) {
      return false;
    }

    return this.pagination.current_page < this.pagination.total_pages;
  }

  get hasPrevious(): boolean {
    if (!this.paginationSet) {
      return false;
    }

    return this.pagination.current_page > 1;
  }

  fetchNextPage(): void {
    this.fetching = true;

    this.host.fetchByHostname(this.hostname, this.pagination.current_page + 1);
  }

  fetchPreviousPage(): void {
    this.fetching = true;

    this.host.fetchByHostname(this.hostname, this.pagination.current_page - 1);
  }
}
