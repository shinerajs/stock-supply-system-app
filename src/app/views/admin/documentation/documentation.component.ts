import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { DefaultLayoutService } from './../../../containers/default-layout/default-layout.service';
// import { CertificateService } from '../../../shared/services/certificate.service';
// import { CreateCertificateComponent } from './../../../components/create-certificate/create-certificate.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent {
  taskArray = [{ taskName: 'Brush teeth', isCompleted: false, isEditable: false }];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    })

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
  }

  // onCheck(index: number) {
  //   console.log(this.taskArray);

  //   this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  // }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
  }


  // modalRef: BsModalRef | undefined;
  // certificateList: any = [];

  // constructor(
  //   private modalService: BsModalService,
  //   private certificateService: CertificateService,
  //   // public layoutService: DefaultLayoutService
  // ) { }

  // ngOnInit() {
  //   //this.layoutService.setCompName('');
  //   this.loadCertificateList();
  // }

  // onOpenModal(doc: any) {
  //   let initialState = {};
  //   if (doc !== undefined) {
  //     initialState = {
  //       name: doc.name,
  //       key: doc.key,
  //     };
  //   }
  //   this.modalRef = this.modalService.show(CreateCertificateComponent,
  //     { animated: true, ignoreBackdropClick: true, initialState });
  //   this.modalRef.content.result
  //     .subscribe((res: any) => {
  //       if (res) {
  //         this.loadCertificateList();
  //       }
  //     });
  // }

  // private loadCertificateList() {
  //   this.certificateService.getCertificateList()
  //     .then((data) => {
  //       this.certificateList = data;
  //     });
  // }

  // onAddCertificate() {
  //   this.onOpenModal(undefined);
  // }

  // onEditCertificate(val: any) {
  //   this.onOpenModal(val);
  // }

  // tryDeleteDoc(cid: any) {
  //   if (window.confirm('Are you sure you want to delete')) {
  //     this.onDeleteDocu(cid);
  //   }
  // }

  // private onDeleteDocu(cid: any) {
  //   this.certificateService.removeCertificate(cid)
  //     .then((res) => {
  //       if (res) {
  //         this.loadCertificateList();
  //       }
  //     });
  // }

  // nl2br(str: any) {
  //   return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
  // }


}
