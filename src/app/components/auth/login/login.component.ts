import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form !: FormGroup;
  email: any = '';
  password: any = '';

  constructor(
    private authService : AuthService,
    private fb : FormBuilder,
    )
  {
      this.form = this.fb.group({
      email : [this.email, [Validators.required, Validators.email]],
      password : [this.password,[Validators.required]]
    })
  }

  login() {
     console.log(this.form.value);
     this.authService.login (this.form.value)
     .then (response => {
      console.log(response);
            
     })
     .catch(error => {
      console.log(error);
      
     })
     
     
     

  }
}
