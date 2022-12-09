import {
  debounceTime,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';

export function lookAhead<T>(): (source$: Observable<T>) => Observable<T> {
  return (source$) => source$.pipe(debounceTime(400), distinctUntilChanged());
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

export function filterEven(): (
  source$: Observable<number>
) => Observable<number> {
  return (source$) => source$.pipe(filter((value) => value % 2 === 0));
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

export function secretMap(): (
  source$: Observable<string | number>
) => Observable<string | number> {
  return (source$) =>
    source$.pipe(
      switchMap((value) =>
        value === 2 ? interval(100).pipe(startWith(0)) : of(value)
      )
    );
}
