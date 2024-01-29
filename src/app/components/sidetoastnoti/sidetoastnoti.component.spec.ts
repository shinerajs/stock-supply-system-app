import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetoastnotiComponent } from './sidetoastnoti.component';

describe('SidetoastnotiComponent', () => {
  let component: SidetoastnotiComponent;
  let fixture: ComponentFixture<SidetoastnotiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidetoastnotiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidetoastnotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
