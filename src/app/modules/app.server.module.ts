import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';

import { MainComponent } from '../components/main/main.component';

@NgModule({
  imports: [
    NoopAnimationsModule,
    BrowserModule.withServerTransition({
        appId: 'portfolio'
    }),
    ServerModule,
    AppModule
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppServerModule { }
