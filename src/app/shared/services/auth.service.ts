import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, UserCredential, authState } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  //   updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  isUserLoggedIn() {
    // const user = authState(this.auth)
    // return user;
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

}
