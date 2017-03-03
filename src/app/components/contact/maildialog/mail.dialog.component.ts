import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail.dialog.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class MailDialogComponent {
  constructor(public dialogRef: MdDialogRef<MailDialogComponent>) {}
}
