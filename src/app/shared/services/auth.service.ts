import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, UserCredential, authState } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../interface/usermain'
import { Firestore, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);
  public userLogStatus = new BehaviorSubject(false);

  constructor(private auth: Auth,
    private firestore: Firestore
  ) { }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // login(email: string, password: string) {
  //   const auth = getAuth();
  //   const promise = new Promise((resolve, reject) => {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((credentials) => {
  //         resolve(credentials);
  //         // this.setUserType(credentials.user.uid);
  //         this.setUserLoggedStatus(true);
  //       })
  //       // .then(() => this.notify.Success('you have successfully signedin', 'Welcome back!'))
  //       .catch((error) => {
  //         // this.notify.onRequestFinished();
  //         // this.handleError(err);
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //       });
  //   });
  //   return promise;
  // }

  setUserLoggedStatus(status: any) {
    this.userLogStatus.next(status);
  }

  // setUserType(userId: User) {        //uid kitti
  //   const promise = new Promise((resolve) => {
  //     this.firestore.doc<User>(`users/${uid}`).valueChanges()
  //       .subscribe((res: User) => {
  //         if (res) {
  //           this.userDetails = res;
  //           if (res.type && res.type !== undefined) {
  //             // if (res.type !== 'Admin') {
  //             //   //supplier/subcontractor code
  //             // }
  //             this.layoutService.setSidemenu(res.type);     //role send to layout
  //           } else {
  //             alert('Please check your network!');      //user not found
  //             this.signOut();

  //           }
  //         }
  //         else this.userDetails = null;
  //       });
  //   }).catch((err) => this.handleError((err)));
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  isUserLoggedIn() {
    // const user = authState(this.auth)
    // return user;
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

}
