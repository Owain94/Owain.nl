import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Log } from '../../../decorators/log.decorator';

@Component({
  selector: 'app-mail-dialog',
  templateUrl: './mail.dialog.component.pug',
  styleUrls: ['./mail.dialog.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
// tslint:disable-next-line:component-class-suffix
export class MailDialogComponent {
  constructor(public dialogRef: MdDialogRef<MailDialogComponent>) {}
}
