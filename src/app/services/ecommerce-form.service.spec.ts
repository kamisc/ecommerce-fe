import { TestBed } from '@angular/core/testing';

import { FormServiceService } from './ecommerce-form.service';

describe('FormServiceService', () => {
  let service: FormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
