import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stock Management System';
  userLoggedIn: boolean = false;
  public layoutConf: any = {};

  constructor(
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.userLoggedIn = this.authService.isUserLoggedIn();
  }
}
