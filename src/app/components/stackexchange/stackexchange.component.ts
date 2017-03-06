import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { StackexchangeService } from '../../services/stackexchange.service';

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

  public profile: Array<any> = [];
  public badges: Array<any> = [];
  public tags: Array<any> = [];
  public answers: Array<any> = [];

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
      (res: any) => {
        this.profile = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getBadges().subscribe(
      (res: any) => {
        this.badges = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getTags().subscribe(
      (res: any) => {
        this.tags = res;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });

    this.stackexchangeService.getAnswers().subscribe(
      (res: any) => {
        this.answers = StackexchangeComponent.sliceArray(res);

        for (const answerArray in this.answers) {
          if (this.answers.hasOwnProperty(answerArray)) {
            for (const answer in this.answers[answerArray]) {
              if (this.answers[answerArray].hasOwnProperty(answer)) {
                this.stackexchangeService.getQuestionTitle(this.answers[answerArray][answer]['question_id']).subscribe(
                  (title: string) => {
                    this.answers[answerArray][answer]['title'] = StackexchangeComponent.decodeHtmlEntity(title);
                  });
              }
            }
          }
        }

        this.loading = false;
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
