import { TestBed } from '@angular/core/testing';

import { InformationSchemaService } from './information-schema.service';

describe('InformationSchemaService', () => {
  let service: InformationSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
