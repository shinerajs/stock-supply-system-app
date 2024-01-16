// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {

//   constructor() { }




//   addSupplier(supplierObj: any, formData) {
//     supplierObj.cdate = firebase.database.ServerValue.TIMESTAMP;
//     const supplierRef = firebase.database().ref(`/supplier`);
//     const promise = new Promise((resolve, reject) => {
//       const key = this.aFdb.list('/supplier').push({ companyInfo: supplierObj }).key;
//       supplierRef.child(`${key}/companyInfo`).update({ sId: key })
//         .then(() => {
//           const formRef = firebase.database().ref(`supplier/${key}/formStatus/`);
//           formRef.update(formData).then(() => {
//             resolve(key);
//           });
//         }).catch(error => this.handleError(error));
//     });
//     return promise;
//   }

// }
