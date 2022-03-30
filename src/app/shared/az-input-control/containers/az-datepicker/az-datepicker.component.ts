import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AzDatepickerComponent),
  multi: true,
};

@Component({
  selector: 'az-datepicker',
  templateUrl: './az-datepicker.component.html',
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR],
})
export class AzDatepickerComponent implements ControlValueAccessor {
  // #region Properties

  private onChangeCallback: (_: string | Date | null) => void = noop;
  private onTouchedCallback: () => void = noop;
  
  @Input() public innerValue: string | Date | null = null;
  @Input() public disabled: boolean = false;
  @Input() public format: string = 'YYYY-MM-DD';
  @Output() public change: EventEmitter<string | Date | null> = new EventEmitter<string | Date | null>();

  // #endregion Properties

  // #region Constructors

  constructor(traductionCalendar: BsLocaleService) {
    traductionCalendar.use('es');
  }

  // #endregion Constructors

  // #region Public Accessors

  @Input() public set now(isNow: boolean) {
    this.value = isNow ? new Date() : null;
  }

  public get value(): string | Date | null {
    return this.innerValue;
  }

  public set value(v: string | Date | null) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.change.emit(v);
    }
  }

  // #endregion Public Accessors

  // #region Public Methods

  public onBlur() {
    this.onTouchedCallback();
  }

  public registerOnChange(fn: (value: string | Date | null) => any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: string | Date | null): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // #endregion Public Methods
}
