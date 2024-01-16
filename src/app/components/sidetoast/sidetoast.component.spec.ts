import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetoastComponent } from './sidetoast.component';

describe('SidetoastComponent', () => {
  let component: SidetoastComponent;
  let fixture: ComponentFixture<SidetoastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidetoastComponent]
    });
    fixture = TestBed.createComponent(SidetoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
