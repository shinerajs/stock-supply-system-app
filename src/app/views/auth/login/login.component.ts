import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Auth, FacebookAuthProvider, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from '@angular/fire/auth';
import {
  addDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { CustomNotificationService } from 'src/app/shared/services/custom-notification.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {};
  isSubmitting = false;
  allUsers !: Observable<Array<any>>

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  @ViewChild(MatProgressBar) progressBar!: MatProgressBar;
  @ViewChild(MatButton) submitButton !: MatButton;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private usersService: UsersService,
    //private snackbar: SnackbarService
  ) { this.loadUsers(); }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  updateUserCollection = async (credential: any) => {
    let userRefObj: Object;
    const userRef = doc(this.afs, 'users-list', credential.user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      userRefObj = {
        displayName: credential.user.displayName,
        uid: credential.user.uid,
        email: credential.user.email,
        role: 'New User',
        createdAt: credential.user.metadata.creationTime,
        lastloginat: credential.user.metadata.lastLoginAt,
      }
    }
    else {
      userRefObj = {
        displayName: credential.user.displayName,
        uid: credential.user.uid,
        email: credential.user.email,
        createdAt: credential.user.metadata.creationTime,
        lastloginat: credential.user.metadata.lastLoginAt,
      }
    }


    try {

      await setDoc(userRef, userRefObj, { merge: true });

      const docSnap = await getDoc(userRef);
      console.log(docSnap.data());


      if (docSnap.exists()) {

        if (docSnap.data() && docSnap.data()['role'] == 'Admin') {
          this.router.navigate(['/admin']);
        }
        else if (docSnap.data() && docSnap.data()['role'] == 'New User') {

          this.router.navigate(['/supplier']);
        }
        else {
          this.router.navigate(['/loginuser']);
        }
      } else {

      }
      //this.uxService.closeOverlay();
    } catch (e: any) {
      console.error(e.message);
      this.isSubmitting = false;
      console.log('error');

      //this.uxService.openSnackBar('Login Failed !!!', 'Try Again');
      //this.uxService.closeOverlay();
    }


  }

  login = async (form: FormGroup, e: Event) => {
    e.preventDefault();
    //this.uxService.showOverlay('Logging in');
    this.isSubmitting = true;
    const email = form.value.email;
    const password = form.value.password;

    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      this.updateUserCollection(credential);
      //this.uxService.closeOverlay();
    } catch (e: any) {
      console.error(e.message);
      this.isSubmitting = false;
      console.log('error');

      //this.uxService.openSnackBar('Authentication Failed', 'Try Again');
      // this.uxService.closeOverlay();
    }
  }

  // updateUserCollection = async (credential: any) => {

  //   const userRef = doc(this.afs, 'users-list', credential.user.uid);

  //   try {

  //     await setDoc(userRef, {
  //       displayName: credential.user.displayName,
  //       uid: credential.user.uid,
  //       email: credential.user.email,
  //       createdAt: credential.user.metadata.creationTime,
  //       lastloginat: credential.user.metadata.lastLoginAt,

  //     }, { merge: true });

  //     const docSnap = await getDoc(userRef);

  //     if (docSnap.exists()) {
  //       localStorage.setItem('user', JSON.stringify(docSnap.data()));
  //         location.reload();

  //       if(docSnap.data() && docSnap.data()['role']=='New User'){
  //         this.router.navigate(['/supplier']);
  //       }
  //       else{
  //         this.router.navigate(['/dashboard']);
  //       }
  //     } else {

  //     }

  //   } catch (e: any) {
  //     console.error(e.message);
  //     this.isSubmitting = false;
  //     //this.snackbar.openSnackBar('Login Failed !!!', 'Try Again');
  //   }
  // }

  // login = async (form: FormGroup, e: Event) => {
  //   e.preventDefault();
  //   this.isSubmitting = true;
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   console.log(email);

  //   try {


  //     const credential = await signInWithEmailAndPassword(this.auth, email, password);

  //     this.updateUserCollection(credential);
  //   } catch (e: any) {
  //     console.error(e.message);
  //     this.isSubmitting = false;
  //     //this.snackbar.openSnackBar('Authentication Failed', 'Try Again');

  //   }
  // }

  // login() {
  //   console.log(this.loginForm.value);
  // this.submitButton.disabled = true;
  // this.progressBar.mode = 'indeterminate';
  //   const { email, password } = this.loginForm.value;

  //   if (!this.loginForm.valid || !email || !password) {
  //     return;

  //   }
  //   this.authService.login(email, password)
  //     .pipe(

  //       this.toast.observe({
  //         success: 'Logged in successfully',
  //         loading: 'Logging in...',
  //         error: 'please enter a valid Email or Password.',
  //         // error: ({ no }) => `There was an error: ${message} `,
  //       })
  //     )

  //     .subscribe(async user => {
  //       if (user) {
  //         this.submitButton.disabled = false;
  //         this.progressBar.mode = 'determinate';
  //         localStorage.setItem('user', JSON.stringify(user));
  //         await this.router.navigate(['']);
  //         location.reload();
  //       }
  //     })
  // }

  loadUsers() {
    this.allUsers = this.usersService.loadUsers();
  }

}
