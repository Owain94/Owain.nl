import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatIconModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { GithubComponent } from './github.component';
import { BetterDatePipe } from './../../pipes/better.date.pipe';

import { GithubService } from './../../services/github.service';

describe('GithubComponent', () => {
  let githubComponent: GithubComponent;
  let githubFixture: ComponentFixture<GithubComponent>;

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
        GithubComponent,

        BetterDatePipe
      ],
      providers: [
        GithubService
      ]
    });
  }));

  beforeEach(() => {
    githubFixture = TestBed.createComponent(GithubComponent);
    githubComponent = githubFixture.componentInstance;
  });

  it('should create the github component', () => {
    expect(githubFixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should set the platform', () => {
    expect(githubComponent.browser).toBeTruthy();
  });

  it('should set the repositories', () => {
    githubComponent.ngOnInit();
    expect(githubComponent.repositories).not.toBeNull();
  });
});
