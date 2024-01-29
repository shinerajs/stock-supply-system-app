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
import { Auth, user } from '@angular/fire/auth';
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

        const ref = doc(this.firestore, 'users-list', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users-list', user?.uid);
    return from(setDoc(ref, user));
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'users-list');
    return collectionData(dbInstance, { idField: 'id' })
  }

  //for updating user details
  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users-list', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
  // updateUser(user: ProfileUser): Observable<void> {
  //   const ref = doc(this.firestore, 'users/' + user?.uid + '/suppliers/' + 'Kcsq8mcf3frpvWXyRChI');
  //   return from(updateDoc(ref, { ...user }));
  // }



  getSupplierDetails(): Observable<ProfileUser[]> {
    // const supplierRef = collection(this.firestore, `supplierdetails/${details.id}`)
    const supplierRef = collection(this.firestore, 'users-list')
    return collectionData(supplierRef, { idField: 'id' }) as Observable<ProfileUser[]>
  }

  getSupplierById(user: ProfileUser): Observable<ProfileUser[]> {
    const supplierRef = collection(this.firestore, `users-list/${user.uid}`)
    console.log(supplierRef);
    return collectionData(supplierRef, { idField: 'id' }) as Observable<ProfileUser[]>
  }

  async getUserDetails() {
    return new Promise((resolve) => {
      resolve(this.auth.currentUser);
    })
  }


  async getAuthUserProfile() {
    return new Promise(async (resolve, reject) => {
      await this.getUserDetails().then(async (res: any) => {
        if (res) {
          await this.getUserProfile(res.uid).then((resp) => {
            resolve(resp);
          })
        }
        else {
          resolve('No Auth User');
        }
      })
    })
  }

  async getUserProfile(currentUID: string) {
    return new Promise(async (resolve, reject) => {
      await this.getDocumentByIDFrom('users-list', currentUID).then((res) => {
        if (res) {
          resolve(res);
        }
        else {
          resolve('No user Details');
        }
      })
    })

  }

  async getDocumentByIDFrom(collectionname: any, key: any) {
    const datalistref = (doc(this.firestore, collectionname, key));
    const docsnap = await getDoc(datalistref);
    if (docsnap.exists()) {
      let obj: any = docsnap.data();
      obj.key = docsnap.id;
      return (obj);
    } else {
      // doc.data() will be undefined in this case
      // 
    }

  }


}
