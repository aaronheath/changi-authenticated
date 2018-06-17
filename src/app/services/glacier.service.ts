import {Injectable} from '@angular/core';
import {environment as ENV} from 'env';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {GlacierArchiveWrapper} from '../wrappers/glacier-archive.wrapper';
import {HttpService} from './http.service';

export interface Pagination {
  current_page: number;
  total_pages: number;
}

interface Vault {
  items: GlacierArchiveWrapper[];
  pagination: Pagination;
}

interface ByVault {
  [key: string]: BehaviorSubject<Vault | null>;
}

@Injectable()
export class GlacierService {
  latest = new BehaviorSubject(null);
  byVault: ByVault = {};

  constructor(private http: HttpService) {
    //
  }

  fetchLatest(): void {
    const url = `${ENV.OAUTH.BASE}/api/glacier/archive`;

    const sub = this.http.get(url).subscribe((response) => {
      this.latest.next(response.data.map(item => GlacierArchiveWrapper.create(item)));

      sub.unsubscribe();
    });
  }

  fetchByVault(vault: string, page: number = 1): void {
    const url = `${ENV.OAUTH.BASE}/api/glacier/archive?filter[vault]=${vault}&page[number]=${page}`;

    if (!this.byVault[vault]) {
      this.byVault[vault] = new BehaviorSubject(null);
    }

    const sub = this.http.get(url).subscribe((response) => {
      this.byVault[vault].next({
        items: response.data.map(item => GlacierArchiveWrapper.create(item)),
        pagination: response.meta.pagination,
      });

      sub.unsubscribe();
    });
  }

  fetchFromGlacier(archive: GlacierArchiveWrapper): void {
    const url = `${ENV.OAUTH.BASE}/api/glacier/archive/${archive.id}`;

    const sub = this.http.get(url).subscribe(() => {
      this.fetchLatest();
      sub.unsubscribe();
    });
  }

  download(archive: GlacierArchiveWrapper): void {
    const url = `${ENV.OAUTH.BASE}/api/glacier/archive/${archive.id}/download-key`;

    const sub = this.http.get(url).subscribe((response) => {
      window.location.href = `${ENV.OAUTH.BASE}/api/glacier/download/${response.data.key}`;

      sub.unsubscribe();
    });
  }
}
