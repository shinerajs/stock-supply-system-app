import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastComponent } from '@ngneat/hot-toast/lib/components/hot-toast/hot-toast.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  selectedPage = '';
  routerURL = '';
  selectRole: any = '';
  currentuid: any = '';

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) { }
  user$ = this.usersService.currentUserProfile$;
  ngOnInit(): void {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    await this.usersService.getUserDetails().then(async (res: any) => {

      this.currentuid = res.uid;
    })
  }
  logOut() {
    // this.authService.logout().subscribe(async user => {
    //   if (user) {
    //     localStorage.clear();
    //     await this.router.navigate(['/loginuser']);
    //     location.reload();
    //   }
    // })

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Alert!',
      action: 'LogOut'
    }
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        // this.supplierService.deleteSupplier(row);
        // console.log(row);
        this.authService.logout()
          .pipe(this.toast.observe({
            success: 'Successfully LogOut',
            loading: 'Logging out...',
            error: 'Please Check the entered details.',
          }))
          .subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/loginuser']);
            location.reload();
          });

        // this.openSnackBar("Supplier deleted Successfully!", "OK")
      }
    })
  }

  // ngOnInit(): void {
  //   this.activatedRoute.queryParams.subscribe((qp) => {
  //     this.selectedPage = qp['section'];
  //   });
  //   this.getCurrentUser();
  // }
  // async getCurrentUser() {
  //   await this.usersService.getUserDetails().then(async (res: any) => {
  //     if (res) {
  //       this.currentuid = res.uid;
  //     }
  //   })
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
