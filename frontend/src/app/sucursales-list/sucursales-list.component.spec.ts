import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesListComponent } from './sucursales-list.component';

describe('SucursalesListComponent', () => {
  let component: SucursalesListComponent;
  let fixture: ComponentFixture<SucursalesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalesListComponent]
    });
    fixture = TestBed.createComponent(SucursalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
