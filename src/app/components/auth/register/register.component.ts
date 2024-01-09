import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { LandingComponent } from '../../landing/landing.component';
import { HotToastService } from '@ngneat/hot-toast';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private toast: HotToastService,
    private usersService: UsersService,
    private router: Router
  ) { }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get name() {
    return this.form.get('name');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  register() {
    console.log(this.form.value);

    const { name, email, password } = this.form.value;
    if (!this.form.valid || !name || !password || !email) {
      return;
    }
    this.authService.register(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        ),

        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: 'Already be a User.',
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
        // this.openSnackBar('Congrats! You are all signed up', 'OK')
      });

  }
}
