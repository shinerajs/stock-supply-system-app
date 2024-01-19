import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierdetailsComponent } from './supplierdetails.component';

describe('SupplierdetailsComponent', () => {
  let component: SupplierdetailsComponent;
  let fixture: ComponentFixture<SupplierdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierdetailsComponent]
    });
    fixture = TestBed.createComponent(SupplierdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
