import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { MailDialogComponent } from './maildialog/mail.dialog.component';

import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
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
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

