import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  action !: string;
  tittle !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AlertComponent>
  ) {
    this.action = data.action;
    this.tittle = data.tittle;
  }

  close() {
    this.dialogRef.close();
  }

  actions() {
    const action = true;
    this.dialogRef.close(action);
  }


}
