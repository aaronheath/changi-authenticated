import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRowComponent } from './host-row.component';

describe('HostRowComponent', () => {
  let component: HostRowComponent;
  let fixture: ComponentFixture<HostRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostRowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
