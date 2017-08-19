import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class HeaderComponent {}
