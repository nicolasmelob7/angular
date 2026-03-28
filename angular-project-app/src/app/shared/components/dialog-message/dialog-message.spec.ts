import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessage } from './dialog-message';

describe('DialogMessage', () => {
  let component: DialogMessage;
  let fixture: ComponentFixture<DialogMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
