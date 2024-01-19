import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from 'src/app/shared/interface/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore,
    private authService: AuthService,
    private auth: Auth) { }

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'users');
    return collectionData(dbInstance, { idField: 'id'})
  }

  //for updating user details
  // updateUser(user: ProfileUser): Observable<void> {
  //   const ref = doc(this.firestore, 'users', user?.uid);
  //   return from(updateDoc(ref, { ...user }));
  // }
  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users/' + user?.uid + '/suppliers/' + 'Kcsq8mcf3frpvWXyRChI');
    return from(updateDoc(ref, { ...user }));
  }



  getSupplierDetails(details: ProfileUser): Observable<ProfileUser[]> {
    const supplierRef = collection(this.firestore, `supplierdetails/${details.id}`)
    console.log(supplierRef);

    return collectionData(supplierRef, { idField: 'id' }) as Observable<ProfileUser[]>

  }

  async getUserDetails() {
    return new Promise((resolve) => {
      resolve(this.auth.currentUser);
    })
  }


}
