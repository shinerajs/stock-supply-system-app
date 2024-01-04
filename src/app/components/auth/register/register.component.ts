import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


constructor (
  private authService: AuthService,
  private router: Router
  ) {


}

  register() {
   // console.log(this.form.value);
   //this.authService.register(this.form.value)
  //  .then(response => {
  //      console.log(response);
  //      this.router.navigate(['/login']);
  //  })
  //  .catch(error => console.log(error));

    
  }
}
