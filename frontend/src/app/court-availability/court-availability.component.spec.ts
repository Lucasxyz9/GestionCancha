import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtAvailabilityComponent } from './court-availability.component';

describe('CourtAvailabilityComponent', () => {
  let component: CourtAvailabilityComponent;
  let fixture: ComponentFixture<CourtAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
