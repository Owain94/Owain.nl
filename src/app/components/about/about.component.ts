import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.pug',
  styleUrls: ['./about.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class AboutComponent {
  public skills = [
    { name: 'Angular', color: 'primary', link: 'https://angular.io/' },
    { name: 'AngularJS', color: 'accent', link: 'https://angularjs.org/' },
    { name: 'TypeScript', color: 'primary', link: 'https://www.typescriptlang.org/' },
    { name: 'JavaScript', color: 'primary', link: 'https://www.javascript.com/' },
    { name: 'NodeJS', color: 'none', link: 'https://nodejs.org/en/' },
    { name: 'VueJS', color: 'none', link: 'https://vuejs.org/' },
    { name: 'ASP.NET / ASP.NET MVC', color: 'primary', link: 'https://www.asp.net/mvc' },
    { name: 'Entity Framework', color: 'accent', link: 'https://msdn.microsoft.com/en-us/library/aa937723(v=vs.113).aspx' },
    { name: 'WinForms', color: 'accent', link: 'https://docs.microsoft.com/en-us/dotnet/framework/winforms/' },
    { name: 'ADO.NET', color: 'accent', link: 'https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview' },
    { name: 'C#', color: 'primary', link: 'https://docs.microsoft.com/en-us/dotnet/csharp/csharp' },
    { name: 'HTML', color: 'primary', link: 'https://www.w3.org/html/' },
    { name: 'CSS', color: 'primary', link: 'https://www.w3.org/Style/CSS/' },
    { name: 'Java', color: 'none', link: 'https://www.java.com/en/' },
    { name: 'PHP', color: 'primary', link: 'https://secure.php.net/' },
    { name: 'Python', color: 'accent', link: 'https://www.python.org/' },
    { name: 'MySQL', color: 'accent', link: 'https://www.mysql.com/' },
    { name: 'PostgreSQL', color: 'accent', link: 'https://www.postgresql.org/' }
  ];
}
