import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubResponse } from '../interfaces/github.interface';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class GithubService {
  // tslint:disable-next-line:no-inferrable-types
  private username: string = 'owain94';

  private static sliceArray(array: Array<any>): Array<Array<any>> {
    const amount = Math.ceil(array.length / 2);
    return [array.slice(0, amount), array.slice(amount, array.length)];
  }

  constructor(private http: HttpClient) {}

  public getRepositories(): Observable<Array<Array<GithubResponse>> | {'error': boolean}> {
    return this.http.get(`//api.github.com/users/${this.username}/repos`)
      .map((res: Object) => res)
      .map((res: Array<GithubResponse>) => {

        res.sort((a: GithubResponse, b: GithubResponse) => {
          const right = new Date(a.updated_at);
          const left = new Date(b.updated_at);
          return right > left ? -1 : right < left ? 1 : 0;
        });

        return GithubService.sliceArray(res);
      })
      .catch(error => Observable.of({'error': true}))
      .share();
  }
}
