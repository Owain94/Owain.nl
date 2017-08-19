import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

import { GithubService } from '../../services/github.service';

import { GithubResponse } from '../../interfaces/github.interface';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.pug',
  styleUrls: ['./github.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class GithubComponent implements OnInit {
  public repositories: Observable<Array<Array<GithubResponse>> | {'error': boolean}>;
  public browser: boolean;

  constructor(private githubService: GithubService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.browser = isPlatformBrowser(this.platformId);
  }

  public ngOnInit() {
    this.repositories = this.githubService.getRepositories();
  }
}
