import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGlacierVaultComponent } from './individual-glacier-vault.component';

describe('IndividualGlacierVaultComponent', () => {
  let component: IndividualGlacierVaultComponent;
  let fixture: ComponentFixture<IndividualGlacierVaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualGlacierVaultComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGlacierVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
