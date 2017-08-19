import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.component.pug',
  styleUrls: ['./diplomas.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class DiplomasComponent {
  public diplomas =
  [
    { name: 'Mediadeveloper (mediatechnologie)', image: 'glr', date: 'juni 2015' },
  ];

  public certificates = [
    { name: 'Microsoft Technology Associate', image: 'microsoft', date: 'juli 2014' },
    { name: 'Microsoft Certified Professional', image: 'microsoft', date: 'juli 2014' },
    { name: 'Basisveiligheid VCA', image: 'intron', date: 'februari 2011 – februari 2021' }
  ];

  public courses = [
    { name: 'Vue JS - Mastering Web Apps', image: 'udemy', date: 'mei 2017' },
    { name: 'Bootstrap 4 Rapid web development framework', image: 'udemy', date: 'mei 2017' },
    { name: 'Angular 2+ with Typescript essentials', image: 'udemy', date: 'april 2017' },
    { name: 'Ubuntu Web Development', image: 'udemy', date: 'april 2017' },
    { name: 'Ethical Hacking', image: 'udemy', date: 'april 2017' },
    { name: 'SEO Basics for Ranking Better', image: 'udemy', date: 'april 2017' },
    { name: 'ExpressJS Fundamentals', image: 'udemy', date: 'april 2017' },
    { name: 'Github introduction to version control and remote files', image: 'udemy', date: 'april 2017' },
    { name: 'Essentials in JavaScript ES6', image: 'udemy', date: 'april 2017' },
    { name: 'Angular Essentials (Angular 2/ Angular 4 with TypeScript)', image: 'udemy', date: 'april 2017' },
  ];
}
