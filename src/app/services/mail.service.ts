import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

@Injectable()
export class MailService {
  public static handleError (error: Response) {
    console.error('Caught error');
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  constructor(private http: Http) {
  }

  public sendMail(values: Object) {
    const headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      });

    const options = new RequestOptions(
      {
        headers: headers,
        method: 'post'
      });

    return this.http.post('https://owain.nl/mail.php', JSON.stringify(values), options)
      // .map(res => res.json())
      .catch((err: Response) => {
        return MailService.handleError(err);
      })
      .share();
  }
}
