import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualHostComponent } from './individual-host.component';

describe('IndividualHostComponent', () => {
  let component: IndividualHostComponent;
  let fixture: ComponentFixture<IndividualHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualHostComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
