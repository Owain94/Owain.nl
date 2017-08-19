import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.pug',
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class MenuComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public menuClick(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' });
    }
  }
}
