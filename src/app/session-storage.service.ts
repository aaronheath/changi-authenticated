import {Injectable} from '@angular/core';
import {Storage} from './storage';

@Injectable()
export class SessionStorageService extends Storage {
  constructor() {
    super();
  }

  has(key) {
    return this.fetch(key) !== null;
  }

  fetch(key) {
    return sessionStorage.getItem(key);
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }

  set(key, value) {
    sessionStorage.setItem(key, value);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
