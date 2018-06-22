import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlacierRowComponent } from './glacier-row.component';

describe('GlacierRowComponent', () => {
  let component: GlacierRowComponent;
  let fixture: ComponentFixture<GlacierRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlacierRowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlacierRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
