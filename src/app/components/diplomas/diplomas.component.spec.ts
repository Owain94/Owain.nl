import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { DiplomasComponent } from './diplomas.component';

describe('DiplomasComponent', () => {
  let diplomasComponent: DiplomasComponent;
  let diplomasFixture: ComponentFixture<DiplomasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        DiplomasComponent
      ],
    });
  }));

  beforeEach(() => {
    diplomasFixture = TestBed.createComponent(DiplomasComponent);
    diplomasComponent = diplomasFixture.componentInstance;
  });

  it('should create the diplomas component', () => {
    expect(diplomasFixture.debugElement.componentInstance).toBeTruthy();
  });
});
