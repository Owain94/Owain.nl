import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { TestBed, async } from '@angular/core/testing';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './main.component';
import { MenuComponent } from '../menu/menu.component';
import { DiplomasComponent } from '../diplomas/diplomas.component';
import { AboutComponent } from '../about/about.component';
import { StackexchangeComponent } from '../stackexchange/stackexchange.component';
import { GithubComponent } from '../github/github.component';
import { HeaderComponent } from '../header/header.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

import { BetterDatePipe } from '../../pipes/better.date.pipe';

import { StackexchangeService } from './../../services/stackexchange.service';
import { GithubService } from './../../services/github.service';
import { MailService } from './../../services/mail.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        ContactComponent,
        HeaderComponent,
        GithubComponent,
        StackexchangeComponent,
        AboutComponent,
        DiplomasComponent,
        MenuComponent,
        BetterDatePipe
      ],
      imports: [
        MaterialModule,
        FlexLayoutModule.forRoot(),
        ReactiveFormsModule,
        BrowserModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyASqJ2VD-Ko2zOpkNTCh685zAGIenD40A8'
        })
      ],
      providers: [
        MailService,
        GithubService,
        StackexchangeService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
