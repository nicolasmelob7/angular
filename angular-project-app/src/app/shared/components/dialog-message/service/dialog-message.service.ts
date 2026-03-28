import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dialog } from '../model/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogMessageService {
  private showDialogSubject = new BehaviorSubject<Dialog>({} as Dialog);

  showDialog$ = this.showDialogSubject.asObservable();

  open(status: number | string, message: string) {
    this.showDialogSubject.next({
      open: true,
      data: {
        status: status,
        message: message,
      },
    });
  }

  close() {
    this.showDialogSubject.next({
      open: false,
      data: {
        status: '',
        message: '',
      },
    });
  }
}
