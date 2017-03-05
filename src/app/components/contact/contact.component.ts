import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { MailDialogComponent } from './maildialog/mail.dialog.component';

import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public ngForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private mailService: MailService,
              public dialog: MdDialog) {
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
    this.mailService.sendMail(value).subscribe();
    this.dialog.open(MailDialogComponent);
    this.ngForm.reset();
  }
}

