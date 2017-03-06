import { GithubResponse } from '../interfaces/github.interface';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import { MailService } from './mail.service';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class GithubService {
  // tslint:disable-next-line:no-inferrable-types
  private username: string = 'owain94';
  constructor(private http: Http) {
  }

  public getRepositories(): Observable<Array<GithubResponse>> {
    return this.http.get(`https://api.github.com/users/${this.username}/repos`)
      // .map((res: Response) => res.json())
      .map((res: Object) => res)
      .map((res: Array<GithubResponse>) => {

        res.sort((a: GithubResponse, b: GithubResponse) => {
            const right = new Date(a.updated_at);
            const left = new Date(b.updated_at);
            return right > left ? -1 : right < left ? 1 : 0;
        });

        return res;
      })
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }
}
