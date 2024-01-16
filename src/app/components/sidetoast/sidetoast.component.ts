import { Component, Input, OnChanges, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidetoast',
  templateUrl: './sidetoast.component.html',
  styleUrls: ['./sidetoast.component.scss']
})
export class SidetoastComponent {
  _message: any = {
    header: '',
    body: ''
  }
  constructor(

    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SidetoastComponent>
  ) { }
  ngOnInit(): void {
    this._message = this.data;
  }
  closeToast() {
    this.snackBarRef.dismiss();
  }
  routeOut() {
    this.snackBarRef.dismissWithAction();
  }
}
