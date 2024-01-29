// import { Injectable } from '@angular/core';
// import firebase from 'node_modules/firebase/app';
// //import { CustomNotificationService } from './../shared/custom-notification.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CertificateService {

//   constructor(
//     //private notify: CustomNotificationService
//   ) { }

//   addCertificates(cerificate: any) {
//     const certificateRef = firebase.database().ref(`manageCertificate`);
//     const promise = new Promise((resolve, reject) => {
//       certificateRef.push(cerificate).then(() => {
//         resolve(true);
//       });
//     });
//     return promise;
//   }

//   updateCertificate(cId: any, certificate: any) {
//     const promise = new Promise((resolve, reject) => {
//       const newRef = firebase.database().ref(`manageCertificate/${cId}/`);
//       newRef.update({ name: certificate }).then(() => {
//         resolve(true);
//       }).catch(error => this.handleError(error));
//     });
//     return promise;
//   }

//   removeCertificate(key: any) {
//     const promise = new Promise((resolve, reject) => {
//       const ref = firebase.database().ref(`/manageCertificate/`);
//       ref.child(key).remove().then(() => {
//         resolve(true);
//       })
//         .catch(error => this.handleError(error));
//     });
//     return promise;
//   }

//   getCertificateList() {
//     const certificateList: any = [];
//     const promise = new Promise((resolve, reject) => {
//       const certRef = firebase.database().ref(`/manageCertificate/`);
//       certRef.once('value', function (snapshot) {
//         snapshot.forEach(function (child) {

//           const certObj = { name: '', key: '' };
//           certObj.name = child.val()['name'];
//           // certObj.key    =  child.key;
//           certificateList.push(certObj);
//         });
//         resolve(certificateList);
//       });

//     });
//     return promise;
//   }

//   private handleError(error: Error) {
//     console.error(error);
//     alert(error.message);
//   }
// }
