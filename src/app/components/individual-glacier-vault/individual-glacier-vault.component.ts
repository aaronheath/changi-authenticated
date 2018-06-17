import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {GlacierService} from '../../services/glacier.service';
import {Pagination} from '../../services/host.service';
import {GlacierArchiveWrapper} from '../../wrappers/glacier-archive.wrapper';

@Component({
  selector: 'app-individual-glacier-vault',
  templateUrl: './individual-glacier-vault.component.html',
  styleUrls: ['./individual-glacier-vault.component.scss'],
})
export class IndividualGlacierVaultComponent implements OnInit {
  vault: string;
  fetching = true;
  archives: GlacierArchiveWrapper[] = [];
  pagination: Pagination;
  archivesSub: Subscription;

  constructor(private route: ActivatedRoute, private title: Title, private glacier: GlacierService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.vault = params.get('name');

      this.title.setTitle(this.vault);
    });

    this.glacier.fetchByVault(this.vault);

    this.archivesSub = this.glacier.byVault[this.vault].subscribe(archives => {
      if (!archives) {
        return;
      }

      this.archives = archives.items;
      this.pagination = archives.pagination;
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

    this.glacier.fetchByVault(this.vault, this.pagination.current_page + 1);
  }

  fetchPreviousPage(): void {
    this.fetching = true;

    this.glacier.fetchByVault(this.vault, this.pagination.current_page - 1);
  }
}
