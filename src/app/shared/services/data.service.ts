import { Injectable } from '@angular/core';
import { collection, doc, Firestore, addDoc, collectionData, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore'
import { Supplier } from '../interface/supplier';
import { Observable, from } from 'rxjs';
import { SupplierDetails } from '../interface/supplier-details';
import { UsersService } from './users.service';
import { Auth, UserInfo, updateProfile, getAuth } from '@angular/fire/auth'
import { ProfileUser } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  user$ = this.usersService.currentUserProfile$;

  constructor(private firestore: Firestore,
    private usersService: UsersService,
    private auth: Auth) { }

  //Add Supplier to Firebase

  async getUserDetails() {
    return new Promise((resolve) => {
      resolve(this.auth.currentUser);
    })
  }

  // async addSupplier(supplier: Supplier) {
  //   supplier.id = doc(collection(this.firestore, 'id')).id
  //   return addDoc(collection(this.firestore, 'suppliers'), supplier);
  // }

  async addSupplier(user: ProfileUser) {
    user.id = doc(collection(this.firestore, "id")).id
    console.log(user?.uid);
    return addDoc(collection(this.firestore, 'users/' + 'ZQ1rk1LEwkbTf5hHSFyiFKrIDJa2' + '/suppliers'), user);
  }

  async addSupplierDetails(details: SupplierDetails) {
    details.id = doc(collection(this.firestore, 'id')).id
    return addDoc(collection(this.firestore, 'supplierdetails'), details);
  }

  getSupplierDetails(user: ProfileUser): Observable<SupplierDetails[]> {
    const supplierRef = collection(this.firestore, `supplierdetails/${user.id}`)
    console.log(supplierRef);

    return collectionData(supplierRef, { idField: 'id' }) as Observable<SupplierDetails[]>
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
    const ref = doc(this.firestore, `users-list/${supplier.id}`);
    return from(updateDoc(ref, { ...supplier }));
  }

  //Get Supplier from Firebase

  // getSupplier(): Observable<Supplier[]> {
  //   const supplierRef = collection(this.firestore, 'suppliers')
  //   return collectionData(supplierRef, { idField: 'id' }) as Observable<Supplier[]>
  // }
  getSupplier(): Observable<Supplier[]> {
    const supplierRef = collection(this.firestore, 'users-list')
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