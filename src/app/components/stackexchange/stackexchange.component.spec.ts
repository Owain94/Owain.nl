import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatChipsModule } from '@angular/material';

import { StackexchangeComponent } from './stackexchange.component';

import { StackexchangeService } from './../../services/stackexchange.service';

describe('StackexchangeComponent', () => {
  let stackexchangeComponent: StackexchangeComponent;
  let stackexchangeFixture: ComponentFixture<StackexchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,

        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        StackexchangeComponent
      ],
      providers: [
        StackexchangeService
      ]
    });
  }));

  beforeEach(() => {
    stackexchangeFixture = TestBed.createComponent(StackexchangeComponent);
    stackexchangeComponent = stackexchangeFixture.componentInstance;
  });

  it('should create the stackexchange component', () => {
    expect(stackexchangeFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should set the platform', () => {
    expect(stackexchangeComponent.browser).toBeTruthy();
  });

  it('should set the profile', () => {
    stackexchangeComponent.ngOnInit();
    expect(stackexchangeComponent.profile).not.toBeNull();
  });

  it('should set the badges', () => {
    stackexchangeComponent.ngOnInit();
    expect(stackexchangeComponent.badges).not.toBeNull();
  });

  it('should set the tags', () => {
    stackexchangeComponent.ngOnInit();
    expect(stackexchangeComponent.tags).not.toBeNull();
  });

  it('should set the answers', () => {
    stackexchangeComponent.ngOnInit();
    expect(stackexchangeComponent.answers).not.toBeNull();
  });

  it('should calculate score', () => {
    expect(stackexchangeComponent.score('0', 'false')).toBe('0');
    expect(stackexchangeComponent.score('0', 'true')).toBe('+15');
    expect(stackexchangeComponent.score('1', 'false')).toBe('+10');
    expect(stackexchangeComponent.score('1', 'true')).toBe('+25');
  });
});
