import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Log } from '../../decorators/log.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@Log()
export class MainComponent {}
