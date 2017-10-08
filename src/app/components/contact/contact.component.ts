import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Log } from '../../decorators/log.decorator';

import { MailDialogComponent } from './maildialog/mail.dialog.component';

import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.pug',
  styleUrls: ['./contact.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class ContactComponent implements OnInit {
  public ngForm: FormGroup;
  public browser: boolean;

  constructor(private formBuilder: FormBuilder,
              private mailService: MailService,
              public dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.browser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'preposition': '',
      'lastName': [null, Validators.required],
      // tslint:disable-next-line:max-line-length
      'mail': [null, Validators.compose([Validators.required, this.validateEmail])],
      'subject': [null, Validators.required],
      'message': [null, Validators.compose([Validators.required])],
      'copy': false
    });
  }

  private validateEmail(control: FormControl) {
    const EMAIL_REGEXP = /\S+@\S+\.\S+/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  public submitForm(value: any) {
    this.mailService.sendMail(value).subscribe((res: {'error': boolean}) => {
      this.dialog.open(MailDialogComponent);
      this.ngForm.reset();
    });
  }
}

