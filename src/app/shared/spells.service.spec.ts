import { TestBed } from '@angular/core/testing';

import { SpellsServiceService } from './spells-service.service';

describe('SpellsServiceService', () => {
  let service: SpellsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
