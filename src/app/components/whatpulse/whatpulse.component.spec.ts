import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatIconModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { WhatpulseComponent } from './whatpulse.component';

import { CountoDirective } from './../../directives/counto.directive';

import { ThousandSeparatorPipe } from './../../pipes/thousand.separator.pipe';

import { WhatpulseService } from './../../services/whatpulse.service';

describe('WhatpulseComponent', () => {
  let whatpulseComponent: WhatpulseComponent;
  let whatpulseFixture: ComponentFixture<WhatpulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,

        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        WhatpulseComponent,

        CountoDirective,

        ThousandSeparatorPipe
      ],
      providers: [
        WhatpulseService
      ]
    });
  }));

  beforeEach(() => {
    whatpulseFixture = TestBed.createComponent(WhatpulseComponent);
    whatpulseComponent = whatpulseFixture.componentInstance;
  });

  it('should create the whatpulse component', () => {
    expect(whatpulseFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should set the platform', () => {
    expect(whatpulseComponent.browser).toBeTruthy();
  });

  it('should set the stats', () => {
    whatpulseComponent.ngOnInit();
    expect(whatpulseComponent.stats).not.toBeNull();
  });
});
