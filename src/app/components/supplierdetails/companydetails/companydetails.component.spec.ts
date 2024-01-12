import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydetailsComponent } from './companydetails.component';

describe('CompanydetailsComponent', () => {
  let component: CompanydetailsComponent;
  let fixture: ComponentFixture<CompanydetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanydetailsComponent]
    });
    fixture = TestBed.createComponent(CompanydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
