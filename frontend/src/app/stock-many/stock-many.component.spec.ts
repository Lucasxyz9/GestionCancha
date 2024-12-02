import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockManyComponent } from './stock-many.component';

describe('StockManyComponent', () => {
  let component: StockManyComponent;
  let fixture: ComponentFixture<StockManyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockManyComponent]
    });
    fixture = TestBed.createComponent(StockManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
