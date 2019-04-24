import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsucranceComponent } from './insucrance.component';

describe('InsucranceComponent', () => {
  let component: InsucranceComponent;
  let fixture: ComponentFixture<InsucranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsucranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsucranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
