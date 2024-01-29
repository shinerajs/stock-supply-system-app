import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/data.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UxserviceService } from 'src/app/shared/services/uxservice.service';

export class docObjFile {
  docid?: string;
  description?: string;
  title?: string;
  mandate?: boolean = true;
  refno?: string;
  fileformat?: string;
  for?: string;
  aproovals?: any;
}

@Component({
  selector: 'app-add-certificates',
  templateUrl: './add-certificates.component.html',
  styleUrls: ['./add-certificates.component.scss']
})
export class AddCertificatesComponent {

  // form !: FormGroup;
  // tittle !: string;
  // buttonName !: string;
  // certificates !: string;

  // constructor(
  //   private fb: FormBuilder,
  //   @Inject(MAT_DIALOG_DATA) data: any,
  //   private dataService: DataService,
  //   private dialogRef: MatDialogRef<AddCertificatesComponent>
  // ) {
  //   this.tittle = data.tittle;
  //   this.buttonName = data.buttonName;
  //   this.certificates = data.certificates;
  // }

  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     certificates: [this.certificates, [Validators.required]]
  //   })
  // }

  // addCertificates() {

  // }


  formatselected!: any;
  docObj: docObjFile = new docObjFile();
  nulltitle: boolean = false;
  formatList: string[] = ['PDF', 'JPG/JPEG/PNG', 'DWG/DXF/SFV'];
  constructor(
    public dialogRef: MatDialogRef<AddCertificatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestoreService: FirestoreService,
    private uxservice: UxserviceService,
  ) { }


  ngOnInit(): void {
    this.formatselected = [this.formatList[0]];
  }
  close() {
    this.dialogRef.close();
  }
  async onAdd(form: NgForm, eve: any) {
    eve.preventDefault();
    form.form.updateValueAndValidity();
    if (form.form.invalid) {

      Object.keys(form.form.controls).forEach((key) => {
        form.form.get(key)?.markAsDirty(); //mark dirty if fields are empty
      });
    }
    else {

      try {
        this.addToDatabase();

      } catch (e: any) {
        console.error(e.message);
      }
      //  finally {
      //   this.docObj = new docObjFile();

      // }
    }
  }
  async addToDatabase() {
    this.uxservice.showOverlay('Adding Document to Server');
    this.docObj.docid = this.data + 'GMDOC' + new Date().getTime();
    this.docObj.refno = this.data + 'GMDOC' + new Date().getTime();
    this.docObj.fileformat = this.formatselected ? this.formatselected : 'PDF';
    this.docObj.for = this.data;
    this.docObj.aproovals = {
      byadmin: false,
      byuser: false,
      byarchitect: false,
      bygmteam: false,
      bygovt: false,
      final: false,


    }
    console.log(this.docObj);
    await this.firestoreService.addDocumentTo(this.docObj).then((res) => {
      this.uxservice.instantCloseOverlay();
      this.close();
    })

  }
}
