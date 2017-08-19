import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { stackKey } from '../../helpers/constants';

import {
  StackexchangeResponseProfile,
  StackexchangeResponseBadges,
  StackexchangeResponseTags,
  StackexchangeResponseAnswers,
  StackexchangeResponseQuestion,
  StackexchangeProfile,
  StackexchangeBadges,
  StackexchangeTags,
  StackexchangeAnswers
} from '../interfaces/stackexchange.interface';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class StackexchangeService {
  // tslint:disable-next-line:no-inferrable-types
  private apiVersion: number = 2.2;
  // tslint:disable-next-line:no-inferrable-types
  private userId: number = 3787650;

  private static decodeHtmlEntity(str: string): string {
    return str.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });
  }

  private static sliceArray(array: Array<any>): Array<Array<any>> {
    const amount = Math.ceil(array.length / 2);
    return [array.slice(0, amount), array.slice(amount, array.length)];
  }

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<StackexchangeProfile | {'error': boolean}> {
    return this.http.get(
        `//api.stackexchange.com/${this.apiVersion}/users/${this.userId}?site=stackoverflow&key=${stackKey}`
      )
      .map((res: Object) => res)
      .map((res: StackexchangeResponseProfile) => {
        return res.items[0];
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }

  public getBadges(): Observable<Array<StackexchangeBadges> | {'error': boolean}> {
    return this.http.get(
        `//api.stackexchange.com/${this.apiVersion}/users/${this.userId}/badges?` +
        `order=desc&sort=rank&site=stackoverflow&key=${stackKey}`
      )
      .map((res: Object) => res)
      .map((res: StackexchangeResponseBadges) => {
        return res.items;
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }

  public getTags(): Observable<Array<StackexchangeTags> | {'error': boolean}> {
    return this.http.get(
        `//api.stackexchange.com/${this.apiVersion}/users/${this.userId}/tags?` +
        `page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow&key=${stackKey}`
      )
      // .map((res: Object) => res)
      .map((res: StackexchangeResponseTags) => {
        return res.items;
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }

  private getAnswers(): Observable<Array<string | Array<StackexchangeAnswers>> | {'error': boolean}> {
    return this.http.get(
        `//api.stackexchange.com/${this.apiVersion}/users/${this.userId}/answers` +
        `?page=1&pagesize=10&order=desc&sort=creation&site=stackoverflow&key=${stackKey}`
      )
      .map((res: Object) => res)
      .map((res: StackexchangeResponseAnswers) => {
        // tslint:disable-next-line:no-inferrable-types
        let ids: string = '';

        for (const question of res.items) {
          ids += `${question.question_id};`;
        }

        return [res.items, ids.substring(0, ids.length - 1)];
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }

  private getQuestionTitles(answers: [Array<StackexchangeAnswers>, string]): Observable<Array<StackexchangeAnswers> | {'error': boolean}> {
    return this.http.get(
        `//api.stackexchange.com/${this.apiVersion}/questions/${answers[1]}` +
        `?site=stackoverflow&key=${stackKey}`
      )
      .map((res: Object) => res)
      .map((res: StackexchangeResponseQuestion) => {
        for (const answer in answers[0]) {
          if (answers[0].hasOwnProperty(answer)) {
            for (const question in res.items) {
              if (res.items.hasOwnProperty(question)) {
                if (answers[0][answer]['question_id'] === res.items[question]['question_id']) {
                  answers[0][answer]['title'] = StackexchangeService.decodeHtmlEntity(res.items[question]['title']);
                }
              }
            }
          }
        }

        return answers[0];
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }

  public allAnswers(): Observable<Array<Array<StackexchangeAnswers>> | {'error': boolean}> {
    return this.getAnswers()
      .mergeMap((res: [Array<StackexchangeAnswers>, string]) => this.getQuestionTitles(res))
      .map((res: Array<StackexchangeAnswers>) => {
        return StackexchangeService.sliceArray(res);
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }
}
