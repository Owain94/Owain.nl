
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MailService } from './mail.service';

import {
  StackexchangeResponseProfile,
  StackexchangeResponseBadges,
  StackexchangeResponseTags,
  StackexchangeResponseAnswers,
  StackexchangeResponseQuestion,
  StackexchangeProfile,
  StackexchangeBadges,
  StackexchangeTags,
  StackexchangeAnswers,
  StackexchangeQuestion
} from '../interfaces/stackexchange.interface';

import { Observable } from 'rxjs/Observable';

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

  public getProfile(): Observable<StackexchangeProfile> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}?site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponseProfile) => {
        return res.items[0];
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getBadges(): Observable<Array<StackexchangeBadges>> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/badges?` +
        `order=desc&sort=rank&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponseBadges) => {
        return res.items;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getTags(): Observable<Array<StackexchangeTags>> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/tags?` +
        `page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponseTags) => {
        return res.items;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getAnswers(): Observable<[Array<StackexchangeAnswers>, string]> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/users/${this.userId}/answers` +
        `?page=1&pagesize=10&order=desc&sort=creation&site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponseAnswers) => {
        // tslint:disable-next-line:no-inferrable-types
        let ids: string = '';

        for (const question of res.items) {
          ids += `${question.question_id};`;
        }

        return [res.items, ids.substring(0, ids.length - 1)];
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }

  public getQuestionTitles(answers: [Array<StackexchangeAnswers>, string]): Observable<Array<StackexchangeQuestion>> {
    return this.http.get(
        `https://api.stackexchange.com/${this.apiVersion}/questions/${answers[1]}` +
        `?site=stackoverflow&key=${this.key}`
      )
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: StackexchangeResponseQuestion) => {
        for (const answer in answers[0]) {
          if (answers[0].hasOwnProperty(answer)) {
            for (const question in res.items) {
              if (res.items.hasOwnProperty(question)) {
                if (answers[0][answer]['question_id'] === res.items[question]['question_id']) {
                  answers[0][answer]['title'] = res.items[question]['title'];
                }
              }
            }
          }
        }

        return answers[0];
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }
}
