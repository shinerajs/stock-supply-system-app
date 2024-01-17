import { Component, ViewChild } from '@angular/core';
import {
  Auth,
  updateProfile,
  createUserWithEmailAndPassword,
  GoogleAuthProvider
} from "@angular/fire/auth";
import {
  addDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { SnackbarService } from '../../../shared/services/snackbar.service';


// export function passwordsMatchValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password')?.value;
//     const confirmPassword = control.get('confirmPassword')?.value;

//     if (password && confirmPassword && password !== confirmPassword) {
//       return { passwordsDontMatch: true };
//     } else {
//       return null;
//     }
//   };
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isSubmitting = false;
  user: any = {};
  constructor(
    private auth: Auth,
    // public afAuth: AngularFireAuth,
    private afs: Firestore,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }
  register = async (form: NgForm, e: Event) => {

    e.preventDefault();
    form.form.updateValueAndValidity();
    if (form.form.invalid) {
      Object.keys(form.form.controls).forEach((key) => {
        form.form.get(key)?.markAsDirty(); //mark dirty if fields are empty
      });
    }
    else {
      this.isSubmitting = true;

      try {
        const credential = await createUserWithEmailAndPassword(
          this.auth,
          form.value.email,
          form.value.password
        );

        await updateProfile(
          credential.user, {
          displayName: form.value.displayName,
        }
        );
        this.updateUserCollection(credential);
      } catch (e: any) {
        console.error(e.message);
        this.isSubmitting = false;
        this.snackbar.openSnackBar(e.message, 'SnackBar');
      }
    }

  }

  updateUserCollection = async (credential: any) => {

    const userRef = doc(this.afs, 'users-list', credential.user.uid);

    try {
      await setDoc(userRef, {
        displayName: credential.user.displayName,
        uid: credential.user.uid,
        email: credential.user.email,
        role: 'New User',
        createdAt: credential.user.metadata.creationTime,
        lastloginat: credential.user.metadata.lastLoginAt,
      });
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      console.error(e.message);
      this.isSubmitting = false;
      this.snackbar.openSnackBar('Login Failed !!!', 'Try Again');
    }

  }

  // form = this.fb.group(
  //   {
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     confirmPassword: ['', Validators.required],
  //   },
  //   { validators: passwordsMatchValidator() }
  // );

  // constructor(
  //   private authService: AuthService,
  //   private fb: NonNullableFormBuilder,
  //   public dialog: MatDialog,
  //   private _snackBar: MatSnackBar,
  //   private toast: HotToastService,
  //   private usersService: UsersService,
  //   private router: Router
  // ) { }

  // get email() {
  //   return this.form.get('email');
  // }

  // get password() {
  //   return this.form.get('password');
  // }

  // get confirmPassword() {
  //   return this.form.get('confirmPassword');
  // }

  // get name() {
  //   return this.form.get('name');
  // }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action);
  // }

  // register() {
  //   console.log(this.form.value);

  //   const { name, email, password } = this.form.value;
  //   if (!this.form.valid || !name || !password || !email) {
  //     return;
  //   } 
  //   try {
  //     const credential = await createUserWithEmailAndPassword(
  //       this.auth,
  //       form.value.email,
  //       form.value.password
  //     );

  //     await updateProfile(
  //       credential.user, { 
  //         displayName: form.value.displayName,
  //       }
  //     );
  //     this.updateUserCollection(credential);
  //   } catch (e: any) {
  //     console.error(e.message);
  //     this.isSubmitting = false;
  //     this.uxService.openSnackBar(e.message, 'SnackBar');
  //   }
  //   // this.authService.register(email, password)
  //   //   .pipe(
  //   //     switchMap(({ user: { uid } }) =>
  //   //       this.usersService.addUser({ uid, email, displayName: name })
  //   //     ),

  //   //     this.toast.observe({
  //   //       success: 'Congrats! You are all signed up',
  //   //       loading: 'Signing up...',
  //   //       error: 'Already be a User.',
  //   //     })
  //   //   )
  //   //   .subscribe(() => {
  //   //     this.router.navigate(['/login']);
  //   //     // this.openSnackBar('Congrats! You are all signed up', 'OK')
  //   //   });

  // }
}
