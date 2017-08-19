import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

import { StackexchangeService } from '../../services/stackexchange.service';

import {
  StackexchangeProfile,
  StackexchangeBadges,
  StackexchangeAnswers,
  StackexchangeTags
} from '../../interfaces/stackexchange.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-stackexchange',
  templateUrl: './stackexchange.component.pug',
  styleUrls: ['./stackexchange.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class StackexchangeComponent implements OnInit {
  public profile: Observable<StackexchangeProfile | {'error': boolean}>;
  public badges: Observable<Array<StackexchangeBadges> | {'error': boolean}>;
  public tags: Observable<Array<StackexchangeTags> | {'error': boolean}>;
  public answers: Observable<Array<Array<StackexchangeAnswers>> | {'error': boolean}>;
  public browser: boolean;

  constructor(private stackexchangeService: StackexchangeService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.browser = isPlatformBrowser(this.platformId);
  }

  public ngOnInit() {
    this.profile = this.stackexchangeService.getProfile();
    this.badges = this.stackexchangeService.getBadges();
    this.tags = this.stackexchangeService.getTags();
    this.answers = this.stackexchangeService.allAnswers();
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
