import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogMessageService } from './service/dialog-message.service';
import { Subject, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'dialog-message',
  standalone: true,
  imports: [],
  template: '',
})
export class DialogMessage implements OnInit, OnDestroy {
  private dialog = inject(MatDialog);
  private dialogService = inject(DialogMessageService);
  private ngUnsubscribe = new Subject<void>();

  private showDialog = this.dialogService.showDialog$;

  ngOnInit() {
    this.showDialog.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (dialog) => {
        dialog.open
          ? this.openDialog(dialog.data.status, dialog.data.message)
          : this.closeDialog();
      },
    });
  }

  openDialog(status: number | string, message: string) {
    this.dialog.open(DialogDataDialog, {
      data: {
        status: status,
        message: message,
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

@Component({
  templateUrl: 'dialog-message.html',
  imports: [MatDialogModule, MatButton],
  styleUrls: ['dialog-message.scss'],
})
export class DialogDataDialog {
  data = inject<{ status: number | string; message: string }>(MAT_DIALOG_DATA);
}
