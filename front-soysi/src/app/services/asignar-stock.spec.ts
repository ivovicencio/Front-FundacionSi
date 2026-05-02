import { TestBed } from '@angular/core/testing';

import { AsignarStock } from './asignar-stock';

describe('AsignarStock', () => {
  let service: AsignarStock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignarStock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
