import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpeedQuizComponent } from './speed-quiz.component';

describe('SpeedQuizComponent', () => {
  let component: SpeedQuizComponent;
  let fixture: ComponentFixture<SpeedQuizComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpeedQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
