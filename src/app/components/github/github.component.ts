import { Component, OnInit } from '@angular/core';

import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public loading: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  public error: boolean = false;
  public repositories: Array<any> = [];

  constructor(private githubService: GithubService) { }

  public ngOnInit() {
    this.githubService.getRepositories().subscribe(
      (res: any) => {
        this.repositories = res;
        this.sliceRepositories();

        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
      });
  }

  public sliceRepositories() {
    const amount = Math.ceil(this.repositories.length / 2);

    const leftSide = this.repositories.splice(0, amount);
    this.repositories = [leftSide, this.repositories];
  }
}
