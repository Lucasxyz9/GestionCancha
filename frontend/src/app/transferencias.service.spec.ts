import { TestBed } from '@angular/core/testing';

import { TransferenciaService } from './transferencias.service';

describe('TransferenciasService', () => {
  let service: TransferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
