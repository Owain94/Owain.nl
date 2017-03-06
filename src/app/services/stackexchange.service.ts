import { StackexchangeResponse } from './../interfaces/stackexchange.interface';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import { MailService } from './mail.service';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class StackexchangeService {
  // tslint:disable-next-line:no-inferrable-types
  private apiVersion: number = 2.2;
  // tslint:disable-next-line:no-inferrable-types
  private key: string = 'xIUU9mnXe)I0D8T9iB6eWw((';
  // tslint:disable-next-line:no-inferrable-types
  private userId: number = 3787650;
  constructor(private http: Http) {
  }

  public getProfile(): Observable<string> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}?site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponse) => {
        return res.items[0];
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getBadges(): Observable<string> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/badges?` +
        `order=desc&sort=rank&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponse) => {
        return res.items;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getTags(): Observable<string> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/tags?` +
        `order=desc&sort=popular&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponse) => {
        return res.items;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getAnswers(): Observable<string> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/answers` +
        `?page=1&pagesize=10&order=desc&sort=creation&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponse) => {
        return res.items;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getQuestionTitle(questionId: number): Observable<string> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/questions/${questionId}` +
        `?order=desc&sort=activity&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponse) => {
        console.log(res);
        return res.items[0]['title'];
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }
}
