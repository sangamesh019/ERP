import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySignupComponent } from './faculty-signup.component';

describe('FacultySignupComponent', () => {
  let component: FacultySignupComponent;
  let fixture: ComponentFixture<FacultySignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
