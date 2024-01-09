import { Injectable } from '@angular/core';
import { collection, doc, Firestore, addDoc, collectionData, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore'
import { Supplier } from '../interface/supplier';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  //Add Supplier to Firebase

  async addSupplier(supplier: Supplier) {
    supplier.id = doc(collection(this.firestore, 'id')).id
    return addDoc(collection(this.firestore, 'suppliers'), supplier);
    //another method =>
    // const supplierRef = collection(this.firestore, 'suppliers');
    // return addDoc(supplierRef, supplier);
    // const supplierRef = doc(this.firestore, `suppliers/${supplier.id}`);
    // await setDoc(supplierRef, Object.assign({}, supplier));
    // return true;

  }

  // async updateSupplier(supplier: Supplier) {
  //   // supplier.id = doc(collection(this.firestore, 'id')).id
  //   // return updateDoc(collection(this.firestore, 'suppliers'), supplier)
  //   // const supplierRef = doc(this.firestore, 'suppliers');
  //   // updateDoc(supplierRef, { supplier })

  //   const supplierRef = doc(this.firestore, `suppliers/${supplier.id}`);
  //   // await updateDoc(supplierRef, supplier);
  //   // return true;
  //   console.log(supplierRef);
  //   return updateDoc(supplierRef, { supplier })
  // }

  updateSupplier(supplier: Supplier) {
    const ref = doc(this.firestore, `suppliers/${supplier.id}`);
    return from(updateDoc(ref, { ...supplier }));
  }

  //Get Supplier from Firebase

  getSupplier(): Observable<Supplier[]> {
    const supplierRef = collection(this.firestore, 'suppliers')
    return collectionData(supplierRef, { idField: 'id' }) as Observable<Supplier[]>
  }

  //To Delete Supplier from Friestore

  deleteSupplier(supplier: Supplier) {
    const supplierRef = doc(this.firestore, `suppliers/${supplier.id}`);
    return deleteDoc(supplierRef);
  }

  getSupplierById(supplier: Supplier): Observable<Supplier[]> {
    const supplierRef = collection(this.firestore, `suppliers/${supplier.id}`)
    console.log(supplierRef);

    return collectionData(supplierRef, { idField: 'id' }) as Observable<Supplier[]>
  }
}