import { Component, OnInit, Inject } from '@angular/core';
//import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';  
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-customalert',
  templateUrl: './customalert.component.html',
  styleUrls: ['./customalert.component.scss']
})
export class CustomalertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public alertDialogRef: MatDialogRef<CustomalertComponent>) { }


  ngOnInit(): void {


  }

  onProceed() {

    //this.snackBarRef.dismissWithAction();
    this.alertDialogRef.close("proceed");

  }
  onCancel() {
    //this.snackBarRef.dismiss();
    this.alertDialogRef.close("cancel");
  }


}
