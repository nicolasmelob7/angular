import { Component, input, model } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-input',
  providers: [provideNativeDateAdapter()],
  imports: [FormField, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
})
export class DateInput {
  id = input<string>(Date().toLocaleString());
  name = input<string>();
  model = model.required<FieldTree<string | number | boolean | Date | null>>();
  labelInput = input<string>('');
  placeholder = input<string>('');
  minDate = input<Date>();
  maxDate = input<Date>();
  onBlurFlag = true;

  onFocus() {
    this.onBlurFlag = false;
  }

  onBlur() {
    this.onBlurFlag = true;
  }
}
