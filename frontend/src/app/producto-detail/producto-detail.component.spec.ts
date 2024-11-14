import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetailComponent } from './producto-detail.component';

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoDetailComponent]
    });
    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
