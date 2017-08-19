import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

import { WhatpulseService } from '../../services/whatpulse.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-whatpulse',
  templateUrl: './whatpulse.component.pug',
  styleUrls: ['./whatpulse.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class WhatpulseComponent implements OnInit {
  public stats: Observable<{'keys': number, 'clicks': number} | {'error': boolean}>;
  public browser: boolean;

  constructor(private whatpulseService: WhatpulseService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.browser = isPlatformBrowser(this.platformId);
  }

  public ngOnInit() {
    this.stats = this.whatpulseService.getStats();
  }
}
