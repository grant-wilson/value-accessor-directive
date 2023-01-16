import { Directive, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true,
    },
  ],
})
export class ValueAccessorDirective<T>
  implements ControlValueAccessor, OnDestroy
{
  private onChange: any;
  private onTouched: any;
  private valueSubject = new Subject<T>();
  private disabledSubject = new Subject<boolean>();
  readonly value = this.valueSubject.asObservable();
  readonly disabled = this.disabledSubject.asObservable();

  constructor() {}

  ngOnDestroy(): void {
    this.valueSubject.complete();
    this.disabledSubject.complete();
  }

  valueChange(v: T) {
    this.onChange(v);
  }

  touchedChange(v: boolean) {
    this.onTouched(v);
  }

  writeValue(obj: any): void {
    this.valueSubject.next(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledSubject.next(isDisabled);
  }
}
