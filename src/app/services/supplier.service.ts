// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Supplier } from 'src/app/interfaces/supplier';
// import { User } from '../interfaces/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore'

// @Injectable({
//   providedIn: 'root'
// })
// export class SupplierService {

//   constructor(private fireStore: AngularFirestore) { }

//   //add supplier

//   saveSuppliers(supplierDetails: Supplier) {
//     supplierDetails.id = this.fireStore.createId();
//     return this.fireStore.collection('/Suppliers').add(supplierDetails);
//   }

//   //get supplier

//   getSuppliers() {
//     return this.fireStore.collection('/Suppliers').snapshotChanges();
//   }

//   //delete supplier

//   deleteSupplier(supplierDetails: Supplier) {
//     return this.fireStore.doc('/Suppliers/' + supplierDetails.id).delete();
//   }

//   //update supplier

//   //editSupplier(supplierDetails: Supplier)

//   // private baseUrl = 'http://localhost:3000';

//   // constructor(private http: HttpClient) { }

//   // saveSuppliers(supplierDetails: Supplier) {
//   //   return this.http.post(`${this.baseUrl}/suppliers`, supplierDetails)
//   // }

//   // getSuppliers(): Observable<Supplier[]> {
//   //   return this.http.get<Supplier[]>(`${this.baseUrl}/suppliers`)
//   // }

//   // editSupplier(postData: any, selectedPdt: any) {
//   //   if (!selectedPdt) {
//   //     return this.http.post(`${this.baseUrl}/suppliers`, postData);
//   //   } else {
//   //     return this.http.put(`${this.baseUrl}/suppliers/${selectedPdt.id}`, postData);
//   //   }
//   // }

//   // deleteSupplier(supplierId: number) {
//   //   return this.http.delete(`${this.baseUrl}/suppliers/${supplierId}`);
//   // }

// }

