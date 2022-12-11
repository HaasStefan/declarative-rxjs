import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';

export function lookAhead<T>(): (source$: Observable<T>) => Observable<T> {
  return (source$) => source$.pipe(debounceTime(800), distinctUntilChanged());
}

export function assertString(): (
  source$: Observable<unknown>
) => Observable<string> {
  return (source$) =>
    source$.pipe(
      filter((value): value is string => !!value && typeof value === 'string')
    );
}

export function assertNumber(): (
  source$: Observable<unknown>
) => Observable<number> {
  return (source$) =>
    source$.pipe(
      filter((value): value is number => !!value && typeof value === 'number')
    );
}

export function split(): (source$: Observable<string>) => Observable<string[]> {
  return (source$) =>
    source$.pipe(
      map((v) => v.split(',')),
      filter((v) => v.length >= 1)
    );
}

export function mapLiteralToNumber(): (
  source$: Observable<string>
) => Observable<string | number> {
  return (source$) =>
    source$.pipe(
      map((str) => {
        switch (str) {
          case 'one':
            return 1;
          case 'two':
            return 2;
          case 'three':
            return 3;
          default:
            return str;
        }
      })
    );
}

export function command(): (
  source$: Observable<string[]>
) => Observable<number | null> {
  return (source$) =>
    source$.pipe(
      map((v) => {
        if (v[0] === 'add') {
          return v
            .slice(1)
            .map((v) => +v)
            .reduce((acc: number, current: number) => {
              return acc + current;
            }, 0);
        } else if (v[0] === 'subtract') {
          return v
            .slice(1)
            .map((v) => +v)
            .reduce((acc: number, current: number) => {
              return acc - current;
            }, 0);
        } else if (v[0] === 'multiply') {
          return v
            .slice(1)
            .map((v) => +v)
            .reduce((acc: number, current: number) => {
              return acc * current;
            }, 1);
        }
        return null;
      })
    );
}
