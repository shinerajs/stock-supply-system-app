import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, UserCredential, authState } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

}
