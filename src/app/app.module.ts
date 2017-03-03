import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { HttpModule } from '@angular/http';
import { HttpCacheModule } from 'ng-http-cache';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { DiplomasComponent } from './components/diplomas/diplomas.component';
import { StackexchangeComponent } from './components/stackexchange/stackexchange.component';
import { GithubComponent } from './components/github/github.component';
import { ContactComponent } from './components/contact/contact.component';
import { MailDialogComponent } from './components/contact/maildialog/mail.dialog.component';
import { FooterComponent } from './components/footer/footer.component';

import { BetterDatePipe } from './pipes/better.date.pipe';

import { MailService } from './services/mail.service';
import { GithubService } from './services/github.service';
import { StackexchangeService } from './services/stackexchange.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactComponent,
    MailDialogComponent,
    HeaderComponent,
    GithubComponent,
    BetterDatePipe,
    StackexchangeComponent,
    AboutComponent,
    DiplomasComponent,
    MenuComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpCacheModule,
    // HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASqJ2VD-Ko2zOpkNTCh685zAGIenD40A8'
    }),
  ],
  providers: [
    MailService,
    GithubService,
    StackexchangeService
  ],
  entryComponents: [
    MailDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
