import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  @ViewChild(MatProgressBar)progressBar!: MatProgressBar;
  @ViewChild(MatButton) submitButton !: MatButton ;

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
  ) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    console.log(this.loginForm.value);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

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
    // .subscribe(() => {
    //   this.router.navigate(['']);
    // });
  }


}
