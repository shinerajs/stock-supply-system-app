import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomalertComponent } from './customalert.component';

describe('CustomalertComponent', () => {
  let component: CustomalertComponent;
  let fixture: ComponentFixture<CustomalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomalertComponent]
    });
    fixture = TestBed.createComponent(CustomalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
