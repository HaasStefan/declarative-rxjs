import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, interval, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  control = new FormControl<string | null>(null);

  secret$ = this.control.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    filter((value): value is string => !!value && typeof value === 'string'),
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
    }),
    switchMap(value => value === 2 ? interval(100).pipe(startWith(0)) : of(value)),
    filter((value): value is number => typeof value === 'number'),
    filter(value => value % 2 === 0),
    map(value => `Secret number: ${value}`),
  );
}
