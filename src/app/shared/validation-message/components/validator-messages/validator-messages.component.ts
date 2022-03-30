import { isNull } from 'lodash';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ErrorMessage } from '../../models/error-message';
import { ErrorMessageDisplay } from '../../models/error-message-display';
import { ValidatorMessageService } from '../../services/validator-message.service';

@Component({
  selector: 'app-validator-messages',
  templateUrl: './validator-messages.component.html',
  styleUrls: ['./validator-messages.component.scss'],
})
export class ValidatorMessagesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // #region Properties

  private _destroyed$ = new Subject();

  @Input() public control!: AbstractControl;
  @Input() public customMessage!: string;
  @Input() public tooltip: boolean = false;

  public errorMessages: ErrorMessage[] = [];

  // #endregion Properties

  // #region Constructors

  constructor(
    private validatorMessageService: ValidatorMessageService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
  }

  // #endregion Constructors

  // #region Public Accessors

  public get invalid(): boolean {
    return this.control ? !isNull(this.control!.errors) : false;
  }

  // #endregion Public Accessors

  // #region Public Methods

  public getMessageToDisplay(errorMessage: ErrorMessage): ErrorMessageDisplay {
    const result: ErrorMessageDisplay = errorMessage as ErrorMessageDisplay;

    if (!this.control || !this.control.errors) {
      return result;
    }
    if (this.control.errors) {
      // Datos de error para el control
      const error = this.control.getError(errorMessage.key);
      // Genera el mensaje a mostrar
      return this.validatorMessageService.getErrorMessageToDisplay(
        errorMessage,
        error
      );
    }

    return result;
  }

  public ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    if (!this.tooltip) {
      return;
    }

    const hostElement = this.element.nativeElement;
    var parent = hostElement.parentNode as HTMLInputElement;
    if (
      parent.classList.contains('form-group') &&
      !parent.classList.contains('position-relative')
    ) {
      this.renderer.addClass(parent, 'position-relative');
    }
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public ngOnInit(): void {
    this.validatorMessageService.errorMessages
      .pipe(take(1), takeUntil(this._destroyed$))
      .subscribe(
        (messages: Array<ErrorMessage>) => (this.errorMessages = messages)
      );
  }

  // #endregion Public Methods
}
