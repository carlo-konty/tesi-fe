import { TestBed } from '@angular/core/testing';

import { MigrationService } from './migration-service.service';

describe('MigrationServiceService', () => {
  let service: MigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
