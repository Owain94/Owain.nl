import { Component } from '@angular/core';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.component.html',
  styleUrls: ['./diplomas.component.scss']
})
export class DiplomasComponent {
  public diplomas =
  [
    [
      { name: 'Mediadeveloper', image: 'glr', date: 'juni 2015' },
      { name: 'Microsoft Technology Associate', image: 'microsoft', date: 'juli 2014' }
    ],
    [
      { name: 'Microsoft Certified Professional', image: 'microsoft', date: 'juli 2014' },
      { name: 'Basisveiligheid VCA', image: 'intron', date: 'februari 2011 – februari 2021' }
    ]
  ];
}
