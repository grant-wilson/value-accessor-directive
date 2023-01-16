import { Component } from '@angular/core';
import { ValueAccessorDirective } from '../value-accessor.directive';

@Component({
  selector: 'app-custom',
  template:
    '{{value}} <button [disabled]="valueAccessor.disabled | async" (click)="incrementValue()">Increment</button>',
  hostDirectives: [ValueAccessorDirective],
})
export class CustomComponent {
  value = 0;
  incrementValue() {
    this.valueAccessor.valueChange(++this.value);
    this.valueAccessor.touchedChange(true);
  }

  constructor(public valueAccessor: ValueAccessorDirective<number>) {
    valueAccessor.value.subscribe((v) => (this.value = v));
  }
}
