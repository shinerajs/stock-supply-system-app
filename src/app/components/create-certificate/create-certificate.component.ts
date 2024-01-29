// import { NgForm } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { Subject } from 'rxjs';
// import { CertificateService } from './../../shared/services/certificate.service';

// @Component({
//   selector: 'app-create-certificate',
//   templateUrl: './create-certificate.component.html',
//   styleUrls: ['./create-certificate.component.css']
// })
// export class CreateCertificateComponent implements OnInit {

//   cretaeCertificate: CretaeCertificate;
//   result: Subject<any> = new Subject<any>();
//   certificateKey: any;

//   constructor(
//     public modalService: BsModalService,
//     public modalRef: BsModalRef,
//     private certificateService: CertificateService
//   ) {
//     this.cretaeCertificate = new CretaeCertificate();
//   }

//   ngOnInit() {
//     // const checkStatus = this.isEmpty(this.modalService.config.initialState);
//     // if (!checkStatus) {
//     //   const value = this.modalService.config.initialState;
//     //   this.cretaeCertificate.name  = value['name'];
//     //   this.certificateKey = value['key'];
//     // } else {
//     //   this.certificateKey = undefined;
//     // }
//   }

//   isEmpty(obj: any) {
//     for (var prop in obj) {
//       if (obj.hasOwnProperty(prop))
//         return false;
//     }
//     return JSON.stringify(obj) === JSON.stringify({});
//   }

//   onAddCertificate(form: NgForm) {
//     if (this.certificateKey !== undefined) {
//       this.certificateService.updateCertificate(this.certificateKey, this.cretaeCertificate.name)
//         .then((res) => {
//           if (res) {
//             this.result.next(true);
//             this.modalRef.hide();
//           }
//         });
//     } else {
//       const newCertificate = form.value;
//       this.certificateService.addCertificates(newCertificate)
//         .then((res) => {
//           if (res) {
//             this.result.next(true);
//             this.modalRef.hide();
//           }
//         });
//     }
//   }

//   onUpdateCertificate() {
//     this.certificateService.updateCertificate(this.certificateKey, this.cretaeCertificate.name)
//       .then((res) => {
//         if (res) {
//           this.result.next(true);
//           this.modalRef.hide();
//         }
//       });
//   }

//   modalHide() {
//     this.result.next('drop');
//     this.modalRef.hide();
//   }
// }
// export class CretaeCertificate {
//   public name?: string;
// }

