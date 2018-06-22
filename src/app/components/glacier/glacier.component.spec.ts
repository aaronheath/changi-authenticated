import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlacierComponent } from './glacier.component';

describe('GlacierComponent', () => {
  let component: GlacierComponent;
  let fixture: ComponentFixture<GlacierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlacierComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlacierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
