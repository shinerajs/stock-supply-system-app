import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetoastnotiComponent } from './sidetoastnoti.component';

describe('SidetoastnotiComponent', () => {
  let component: SidetoastnotiComponent;
  let fixture: ComponentFixture<SidetoastnotiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidetoastnotiComponent]
    });
    fixture = TestBed.createComponent(SidetoastnotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
