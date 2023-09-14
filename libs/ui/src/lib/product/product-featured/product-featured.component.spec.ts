import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeaturedComponent } from './product-featured.component';

describe('ProductFeaturedComponent', () => {
  let component: ProductFeaturedComponent;
  let fixture: ComponentFixture<ProductFeaturedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFeaturedComponent]
    });
    fixture = TestBed.createComponent(ProductFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
