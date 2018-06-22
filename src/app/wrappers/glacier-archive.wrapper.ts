import bytes from 'bytes';
import {differenceInSeconds, distanceInWordsToNow, format, parse} from 'date-fns';

export class GlacierArchiveWrapper {
  private data;
  private statusMap = {
    'requesting': {text: 'Request Sent To Host', css: 'info'},
    'fetch-requested': {text: 'Request Sent To AWS', css: 'info'},
    'fetch-inprogress': {text: 'AWS Fetching', css: 'info'},
    'fetched': {text: 'Ready For Download', css: 'success'},
    'fetch-failed': {text: 'Failed', css: 'fail'},
  };

  constructor(payload) {
    this.data = payload;
  }

  static create(payload) {
    return new GlacierArchiveWrapper(payload);
  }

  get id() {
    return this.data.id;
  }

  get when() {
    return parse(this.data.created_at);
  }

  get whenFormatted() {
    return format(this.when, 'D MMM YYYY [at] HH:mm:ss');
  }

  get timeAgo() {
    return distanceInWordsToNow(this.when);
  }

  get timeAgoStatus() {
    const seconds = differenceInSeconds(new Date, this.when);

    if (seconds > 3600) { // 1 hour
      return 'high';
    }

    return 'low';
  }

  get archiveId() {
    return this.data.archive_id;
  }

  get shortArchiveId() {
    return this.archiveId.substr(0, 10);
  }

  get checksum() {
    return this.data.checksum;
  }

  get shortChecksum() {
    return this.checksum.substr(0, 10);
  }

  get vault() {
    return this.data.vault;
  }

  get filename() {
    return this.data.filename;
  }

  get filesize() {
    return this.readableSize(this.data.filesize);
  }

  get description() {
    return this.data.description;
  }

  get hasDescription() {
    return !!this.description;
  }

  get status() {
    if (!this.data.status) {
      return '-';
    }

    return this.data.status.name;
  }

  get readableStatus() {
    const status = this.statusMap[this.status];

    return status ? status : {};
  }

  get canDownload() {
    return this.status === 'fetched';
  }

  private readableSize(bits) {
    return bytes(bits);
  }
}
