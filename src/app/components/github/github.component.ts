import { Component, OnInit } from '@angular/core';

import { StackexchangeComponent } from '../stackexchange/stackexchange.component';

import { GithubService } from '../../services/github.service';

import { GithubResponse } from '../../interfaces/github.interface';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public loading: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  public error: boolean = false;
  public repositories: Array<Array<GithubResponse>> = [];

  constructor(private githubService: GithubService) { }

  public ngOnInit() {
    this.githubService.getRepositories().subscribe(
      (res: Array<GithubResponse>) => {
        this.repositories = StackexchangeComponent.sliceArray(res);

        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });
  }
}
