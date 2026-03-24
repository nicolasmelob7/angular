import { Component, input, model, ViewEncapsulation } from '@angular/core';
import { FieldState, FieldTree, FormField } from '@angular/forms/signals';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'my-input',
  imports: [FormField, MatFormFieldModule, MatInputModule],
  templateUrl: './my-input.component.html',
  styleUrl: './my-input.component.scss',
})
export class MyInput {
  id = input<string>(Date().toLocaleString());
  name = input<string>();
  type = input<string>('text');
  model = model.required<FieldTree<string | number | boolean | Date | null>>();
  labelInput = input<string>('');
  placeholder = input<string>('');
  onBlurFlag = true;

  onFocus() {
    this.onBlurFlag = false;
  }

  onBlur() {
    this.onBlurFlag = true;
  }
}
