import { Component, Inject } from '@angular/core';
import { AddCertificatesComponent, docObjFile } from './add-certificates/add-certificates.component';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { UxserviceService } from 'src/app/shared/services/uxservice.service';


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})



export class CertificatesComponent {
  filterby: string = '';
  documentList: docObjFile[] = [];
  mandatedocumentList: docObjFile[] = [];
  nonmandatedocumentList: docObjFile[] = [];
  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public dialog: MatDialog,
    private uxservice: UxserviceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(qp => {

      this.filterby = qp['filter'];
      this.getDocumentList(this.filterby);
    });
  }
  async getDocumentList(filterby: string) {
    if (filterby) {


      this.uxservice.showOverlay("Fetching Documents");

      await this.firestoreService.getDocFromWhereEqual('documents-required', 'for', filterby).then((res) => {
        if (res && res.length > 0) {
          this.documentList = res;
          this.nonmandatedocumentList = this.documentList.filter((ele) => ele.mandate === false);
          this.mandatedocumentList = this.documentList.filter((ele) => ele.mandate === true);
        }
        else {
          this.documentList = [];
        }
        this.uxservice.closeOverlay();

      });
    }
  }

  openAddDocsModal(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(AddCertificatesComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.filterby
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getDocumentList(this.filterby);
    });
  }
  // for displaying event description on click(show more)
  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);

    if (hasClass) {
      event.srcElement.classList.remove("show");

    } else {
      event.srcElement.classList.add("show");
    }
  }
}
