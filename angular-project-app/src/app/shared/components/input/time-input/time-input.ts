import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'time-input',
  providers: [provideNativeDateAdapter()],
  imports: [FormField, MatFormFieldModule, MatInputModule, MatTimepickerModule],
  templateUrl: './time-input.html',
  styleUrl: './time-input.scss',
})
export class TimeInput {
  id = input<string>(Date().toLocaleString());
  name = input<string>();
  model = input.required<FieldTree<string | number | boolean | Date | null>>();
  labelInput = input<string>('');
  placeholder = input<string>('');
  minTime = input<Date | null>();
  maxTime = input<Date | null>();
  onBlurFlag = true;

  onFocus() {
    this.onBlurFlag = false;
  }

  onBlur() {
    this.onBlurFlag = true;
  }
}
