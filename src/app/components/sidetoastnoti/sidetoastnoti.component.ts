import { Component, Input, OnChanges, OnInit,Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidetoastnoti',
  templateUrl: './sidetoastnoti.component.html',
  styleUrls: ['./sidetoastnoti.component.scss']
})
export class SidetoastnotiComponent implements OnInit {
 _message:any={
    header:'',
    body:''
  }
  constructor(
    
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SidetoastnotiComponent>
  ) { }
  ngOnInit(): void {
    this._message=this.data;
  }
  closeToast(){
    this.snackBarRef.dismiss();
  }
  routeOut(){
    this.snackBarRef.dismissWithAction();
  }
}
