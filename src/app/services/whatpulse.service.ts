import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class WhatpulseService {
  // tslint:disable-next-line:no-inferrable-types
  private username: string = 'Owain';

  private date: Date = new Date();
  private dateNow: number = Math.floor(this.date.getTime() / 1000);
  private monthAgo: number = Math.floor(this.date.setMonth(this.date.getMonth() - 1) / 1000);

  constructor(private http: HttpClient) {}

  public getStats(): Observable<{'keys': number, 'clicks': number} | {'error': boolean}> {
    return this.http.get(
        `//api.whatpulse.org/pulses.php?user=${this.username}&start=${this.monthAgo}&end=${this.dateNow}&format=json`
      )
      .map((res: Object) => res)
      .map((res) => {
        let keys = 0, clicks = 0;
        Object.values(res).forEach((element) => {
          keys += +element.Keys;
          clicks += +element.Clicks;
        });
        return {
          'keys': keys,
          'clicks': clicks
        };
      })
      .share();
  }
}
