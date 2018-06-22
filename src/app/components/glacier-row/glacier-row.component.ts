import {Component, Input, OnInit} from '@angular/core';
import {GlacierService} from '../../services/glacier.service';
import {copyToClipboard} from '../../support/helpers';
import {GlacierArchiveWrapper} from '../../wrappers/glacier-archive.wrapper';

@Component({
  selector: '[app-glacier-row]',
  templateUrl: './glacier-row.component.html',
  styleUrls: ['./glacier-row.component.scss'],
})
export class GlacierRowComponent implements OnInit {
  @Input() archives: GlacierArchiveWrapper[] = [];
  @Input() showVaultColumn = true;
  @Input() fetching = false;

  constructor(private glacier: GlacierService) {
    //
  }

  ngOnInit() {
    //
  }

  statusCss(status): string {
    const map = {
      fail: 'text-red',
      info: 'text-orange',
      success: 'text-green',
    };

    return map[status] ? map[status] : '';
  }

  get showFetching(): boolean {
    return this.fetching && !this.archives.length;
  }

  get showNothingToDisplay(): boolean {
    return !this.archives.length && !this.fetching;
  }

  fetchFromGlacier(archive: GlacierArchiveWrapper): void {
    this.glacier.fetchFromGlacier(archive);
  }

  download(archive: GlacierArchiveWrapper): void {
    this.glacier.download(archive);
  }

  copy(text: string): void {
    copyToClipboard(text);
  }
}
