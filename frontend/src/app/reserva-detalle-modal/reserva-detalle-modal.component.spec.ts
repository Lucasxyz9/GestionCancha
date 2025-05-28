import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDetalleModalComponent } from './reserva-detalle-modal.component';

describe('ReservaDetalleModalComponent', () => {
  let component: ReservaDetalleModalComponent;
  let fixture: ComponentFixture<ReservaDetalleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaDetalleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
