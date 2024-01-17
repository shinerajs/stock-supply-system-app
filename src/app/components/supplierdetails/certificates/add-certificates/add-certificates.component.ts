import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-certificates',
  templateUrl: './add-certificates.component.html',
  styleUrls: ['./add-certificates.component.scss']
})
export class AddCertificatesComponent {

  form !: FormGroup;
  tittle !: string;
  buttonName !: string;
  certificates !: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddCertificatesComponent>
  ) {
    this.tittle = data.tittle;
    this.buttonName = data.buttonName;
    this.certificates = data.certificates;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      certificates: [this.certificates, [Validators.required]]
    })
  }

  addCertificates() {

  }


}
