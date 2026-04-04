import { Directive, inject } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

@Directive({
  selector: 'input[resetTouchedOnFocus]',
  standalone: true,
  host: {
    '(focus)': 'onFocus($event)',
  },
})
export class ResetTouchedOnFocusDirective {
  private ngControl = inject(FormField, { self: true, optional: true });

  onFocus(event: FocusEvent) {
    this.ngControl?.field()().reset();
  }
}
