import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;
  title = 'Stock Management System';
  // userLoggedIn: boolean = false;
  public layoutConf: any = {};

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }
  ngOnInit() {
    // this.userLoggedIn = this.authService.isUserLoggedIn();
  }
}
