import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { StackexchangeService } from '../../services/stackexchange.service';

import {
  StackexchangeResponse,
  StackexchangeProfile,
  StackexchangeBadges,
  StackexchangeQuestion,
  StackexchangeAnswers,
  StackexchangeTags
} from '../../interfaces/stackexchange.interface';

@Component({
  selector: 'app-stackexchange',
  templateUrl: './stackexchange.component.html',
  styleUrls: ['./stackexchange.component.scss']
})
export class StackexchangeComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public loading: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  public error: boolean = false;

  public profile: StackexchangeProfile;
  public badges: Array<StackexchangeBadges> = [];
  public tags: Array<StackexchangeTags> = [];

  public answers: Array<Array<StackexchangeAnswers>> = [];
  private static decodeHtmlEntity(str: string): string {
    return str.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });
  }

  public static sliceArray(array: Array<any>): Array<Array<any>> {
    const amount = Math.ceil(array.length / 2);

    const leftSide = array.splice(0, amount);
    return [leftSide, array];
  }

  constructor(private stackexchangeService: StackexchangeService) { }

  public ngOnInit() {
    this.stackexchangeService.getProfile().subscribe(
      (res: StackexchangeProfile) => {
        this.profile = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getBadges().subscribe(
      (res: Array<StackexchangeBadges>) => {
        this.badges = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getTags().subscribe(
      (res: Array<StackexchangeTags>) => {
        this.tags = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getAnswers().subscribe(
      (res: Array<StackexchangeAnswers>) => {
        // tslint:disable-next-line:no-inferrable-types
        let ids: string = '';

        for (const question of res) {
          ids += `${question.question_id};`;
        }

        this.answers = StackexchangeComponent.sliceArray(res);
        this.loading = false;

        this.stackexchangeService.getQuestionTitles(ids.substring(0, ids.length - 1)).subscribe(
          (questions: Array<StackexchangeQuestion>) => {
            for (let i = 0; i <= 1; i++) {
              for (let j = 0; j <= 4; j++) {
                let n = (i + 1) * i * (i + i) + j;
                if (i === 1) {
                  n++;
                }

                if (typeof(this.answers[i][j]) !== 'undefined') {
                  this.answers[i][j]['title'] = StackexchangeComponent.decodeHtmlEntity(questions[n]['title']);
                }
              }
            }
          });
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });
  }

  public score(score: string, accepted: string): string {
    const val = Number(score);
    const acc = Boolean(accepted);

    if (val > 0 || acc) {
      return `+${(val * 10) + (acc ? 15 : 0)}`;
    } else {
      return String(val);
    }
  }
}
