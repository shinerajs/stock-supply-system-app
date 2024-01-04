import { Injectable } from '@angular/core';
//import { Firestore, collection, } from '@angular/fire/firestore';
import { collection, doc, Firestore, addDoc, collectionData, deleteDoc } from '@angular/fire/firestore'
import { Supplier } from '../interface/supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  //Add Supplier to Firebase

  addSupplier(supplier: Supplier) {
    supplier.id = doc(collection(this.firestore, 'id')).id
    return addDoc(collection(this.firestore, 'suppliers'), supplier);
//another method =>
    // const supplierRef = collection(this.firestore, 'suppliers');
    // return addDoc(supplierRef, supplier);
  }

  //Get Supplier from Firebase

  getSupplier(): Observable<Supplier[]> {
    const supplierRef = collection(this.firestore, 'suppliers')
    return collectionData(supplierRef, { idField: 'id' }) as Observable<Supplier[]>
  }

  //To Delete Supplier from Friestore

  deleteSupplier(supplier: Supplier) {
    const supplierDocRef = doc(this.firestore, `suppliers/${supplier.id}`);
    return deleteDoc(supplierDocRef);
  }

}