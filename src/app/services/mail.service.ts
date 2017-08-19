import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/share';

@Injectable()
export class MailService {
  constructor(private http: HttpClient) {}

  public sendMail(values: Object) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post(`${process.env.DEPLOY_URL}/mail`, JSON.stringify(values), { 'headers': headers });
  }
}
