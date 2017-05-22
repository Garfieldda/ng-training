import { TestBed, inject } from '@angular/core/testing';

import { ApirequeststorageService } from './apirequeststorage.service';

describe('ApiRequestStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRequestStorageService]
    });
  });

  it('should ...', inject([ApiRequestStorageService], (service: ApiRequestStorageService) => {
    expect(service).toBeTruthy();
  }));
});
