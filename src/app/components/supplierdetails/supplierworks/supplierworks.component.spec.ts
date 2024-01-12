import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierworksComponent } from './supplierworks.component';

describe('SupplierworksComponent', () => {
  let component: SupplierworksComponent;
  let fixture: ComponentFixture<SupplierworksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierworksComponent]
    });
    fixture = TestBed.createComponent(SupplierworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
