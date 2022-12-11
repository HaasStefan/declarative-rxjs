import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import {
  assertNumber,
  assertString,
  command,
  lookAhead,
  split,
} from './custom-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  control = new FormControl<string | null>(null);

  result$ = this.control.valueChanges.pipe(
    debounceTime(800),
    distinctUntilChanged(),
    filter((v): v is string => !!v && typeof v === 'string'),
    map((v) => v.split(',')),
    filter((v) => v.length >= 1),
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

  declarativeResult$ = this.control.valueChanges.pipe(
    lookAhead(),
    assertString(),
    split(),
    command(),
    assertNumber()
  );
}
