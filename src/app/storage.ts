export abstract class Storage {
  abstract has(key): boolean;
  abstract fetch(key): string;
  abstract remove(key): void;
  abstract set(key, value): void;
}
