import { inject, TestBed } from '@angular/core/testing';

import { GlacierService } from './glacier.service';

describe('GlacierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlacierService],
    });
  });

  it('should be created', inject([GlacierService], (service: GlacierService) => {
    expect(service).toBeTruthy();
  }));
});
