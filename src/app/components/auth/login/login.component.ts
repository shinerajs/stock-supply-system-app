import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitting = false;

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
    private loadingService: CustomNotificationService
    // private snackbar: SnackbarService
  ) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
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

  //       if(docSnap.data() && docSnap.data()['role']=='Architect'){
  //         this.router.navigate(['/architect']);
  //       }
  //       else{
  //         this.router.navigate(['/dashboard']);
  //       }
  //     } else {

  //     }

  //   } catch (e: any) {
  //     console.error(e.message);
  //     this.isSubmitting = false;
  //     // this.snackbar.openSnackBar('Login Failed !!!', 'Try Again');
  //   }
  // }

  // async login() {
  //   console.log(this.loginForm.value);

  //   this.submitButton.disabled = true;
  //   this.progressBar.mode = 'indeterminate';

  //   const email = this.loginForm.value.email;
  //   const password = this.loginForm.value.password;
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
  //     // this.snackbar.openSnackBar('Authentication Failed', 'Try Again');

  //   }
  // }

  login() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;

    }
    this.authService.login(email, password)
      .pipe(

        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'please enter a valid Email or Password.',
          // error: ({ no }) => `There was an error: ${message} `,
        })
      )

      .subscribe(async user => {
        if (user) {
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate';
          localStorage.setItem('user', JSON.stringify(user));
          await this.router.navigate(['']);
          location.reload();
        }
      })

  }

}
