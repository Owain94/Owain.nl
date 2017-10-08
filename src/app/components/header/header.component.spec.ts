import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('headerComponent', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
    });
  }));

  beforeEach(() => {
    headerFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerFixture.componentInstance;
  });

  it('should create the header', () => {
    expect(headerFixture.debugElement.componentInstance).toBeTruthy();
  });
});
