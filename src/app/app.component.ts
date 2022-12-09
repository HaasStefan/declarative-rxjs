import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { assertNumber, assertString, filterEven, lookAhead, mapLiteralToNumber, secretMap } from './custom-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  control = new FormControl<string | null>(null);

  secret$ = this.control.valueChanges.pipe(
    lookAhead(),
    assertString(),
    mapLiteralToNumber(),
    secretMap(),
    assertNumber(),
    filterEven(),
    map(value => `Secret number: ${value}`),
  );

}
