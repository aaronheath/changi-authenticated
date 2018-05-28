import bytes from 'bytes';
import {differenceInSeconds, distanceInWordsToNow, format, parse} from 'date-fns';
import duration from 'format-duration';
import roundTo from 'round-to';

export class HostWrapper {
  private data;

  constructor(payload) {
    this.data = payload;
  }

  static create(payload) {
    return new HostWrapper(payload);
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

  get hostname() {
    return this.data.hostname;
  }

  get cpu() {
    return this.data.cpu_arch;
  }

  get diskAvailable() {
    return this.data.disk_available;
  }

  get diskFree() {
    return this.readableSize(this.data.disk_free);
  }

  get diskTotal() {
    return this.readableSize(this.data.disk_total);
  }

  get diskPercentUsed() {
    return roundTo((+this.data.disk_free / +this.data.disk_total) * 100, 2);
  }

  get diskPercentUsedStatus() {
    if (this.diskPercentUsed > 90) {
      return 'high';
    }

    if (this.diskPercentUsed > 70) {
      return 'medium';
    }

    return 'low';
  }

  get memoryFree() {
    return this.readableSize(this.data.free_memory);
  }

  get memoryTotal() {
    return this.readableSize(this.data.total_memory);
  }

  get memoryPercentUsed() {
    return roundTo((+this.data.free_memory / +this.data.total_memory) * 100, 2);
  }

  get memoryPercentUsedStatus() {
    if (this.memoryPercentUsed > 90) {
      return 'high';
    }

    if (this.memoryPercentUsed > 70) {
      return 'medium';
    }

    return 'low';
  }

  get loadAverage1Min() {
    return this.roundLoadAvg(this.data.load_average_1_min);
  }

  get loadAverage1MinStatus() {
    return this.loadAvgStatus(this.data.load_average_1_min);
  }

  get loadAverage5Min() {
    return this.roundLoadAvg(this.data.load_average_5_min);
  }

  get loadAverage5MinStatus() {
    return this.loadAvgStatus(this.data.load_average_5_min);
  }

  get loadAverage15Min() {
    return this.roundLoadAvg(this.data.load_average_15_min);
  }

  get loadAverage15MinStatus() {
    return this.loadAvgStatus(this.data.load_average_15_min);
  }

  private loadAvgStatus(avg) {
    const _avg = +avg;

    if (_avg > 4) {
      return 'high';
    }

    if (_avg > 1) {
      return 'medium';
    }

    return 'low';
  }

  get ip() {
    return this.data.ip;
  }

  get platform() {
    return this.data.platform;
  }

  get release() {
    return this.data.release;
  }

  get uptime() {
    return duration(this.data.uptime);
  }

  get uptimeStatus() {
    if (this.data.uptime < 86400) { // 1 day
      return 'high';
    }

    if (this.data.uptime > 604800) { // 1 week
      return 'medium';
    }

    return 'low';
  }

  get networkInterfaces() {
    return this.data.network_interfaces;
  }

  private readableSize(bits) {
    return bytes(bits);
  }

  private roundLoadAvg(avg) {
    return roundTo(+avg, 2);
  }
}
