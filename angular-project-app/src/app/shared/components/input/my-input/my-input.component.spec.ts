import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputText } from './my-input.component';

describe('InputText', () => {
  let component: InputText;
  let fixture: ComponentFixture<InputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputText],
    }).compileComponents();

    fixture = TestBed.createComponent(InputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
