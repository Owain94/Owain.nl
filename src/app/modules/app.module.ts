import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MdMenuModule, MdButtonModule, MdCardModule, MdChipsModule, MdProgressSpinnerModule, MdInputModule, MdSlideToggleModule, MdDialogModule
} from '@angular/material';

// import { AgmCoreModule } from '@agm/core';
// import { mapsKey } from '../../helpers/constants';

import { MainComponent } from '../components/main/main.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HeaderComponent } from '../components/header/header.component';
import { AboutComponent } from '../components/about/about.component';
import { WhatpulseComponent } from '../components/whatpulse/whatpulse.component';
import { DiplomasComponent } from '../components/diplomas/diplomas.component';
import { GithubComponent } from '../components/github/github.component';
import { StackexchangeComponent } from '../components/stackexchange/stackexchange.component';
import { ContactComponent } from '../components/contact/contact.component';
import { MailDialogComponent } from '../components/contact/maildialog/mail.dialog.component';
import { FooterComponent } from '../components/footer/footer.component';

import { BetterDatePipe } from '../pipes/better.date.pipe';
import { ThousandSeparatorPipe } from '../pipes/thousand.separator.pipe';
import { ValuesPipe } from '../pipes/values.pipe';

import { CountoDirective } from '../directives/counto.directive';

import { MailService } from '../services/mail.service';
import { GithubService } from '../services/github.service';
import { StackexchangeService } from '../services/stackexchange.service';
import { WhatpulseService } from '../services/whatpulse.service';

import * as Raven from 'raven-js';

// Raven
//   .config('https://03d884b718be42638de950df2a94a5d3@sentry.io/189340')
//   .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError);
  }
}

export function provideErrorHandler() {
  // if (process.env.NODE_ENV === 'production') {
  //   return new RavenErrorHandler();
  // } else {
    return new ErrorHandler();
  // }
}

@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    HeaderComponent,
    AboutComponent,
    WhatpulseComponent,
    DiplomasComponent,
    GithubComponent,
    StackexchangeComponent,
    ContactComponent,
    MailDialogComponent,
    FooterComponent,

    BetterDatePipe,
    ThousandSeparatorPipe,
    ValuesPipe,

    CountoDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    MdMenuModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdProgressSpinnerModule,
    MdInputModule,
    MdSlideToggleModule,
    MdDialogModule,

    /* AgmCoreModule.forRoot({
      apiKey: mapsKey
    }), */
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: provideErrorHandler
    },
    MailService,
    GithubService,
    StackexchangeService,
    WhatpulseService
  ],
  entryComponents: [
    MailDialogComponent
  ],
  exports: [
    MainComponent
  ]
})
export class AppModule {}
