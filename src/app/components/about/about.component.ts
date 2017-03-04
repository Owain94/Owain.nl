import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public skills = [
    { name: 'Angular', color: 'primary' },
    { name: 'AngularJS', color: 'accent' },
    { name: 'TypeScript', color: 'primary' },
    { name: 'JavaScript', color: 'primary' },
    { name: 'NodeJS', color: 'none' },
    { name: 'ASP.NET / ASP.NET MVC', color: 'primary' },
    { name: 'Entity Framework', color: 'accent' },
    { name: 'WinForms', color: 'accent' },
    { name: 'ADO.NET', color: 'accent' },
    { name: 'C#', color: 'primary' },
    { name: 'HTML', color: 'primary' },
    { name: 'CSS', color: 'primary' },
    { name: 'Java', color: 'none' },
    { name: 'PHP', color: 'primary' },
    { name: 'Python', color: 'accent' },
    { name: 'MySQL / PostgreSQL', color: 'accent' }
  ];
}
