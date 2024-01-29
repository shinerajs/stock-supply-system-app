import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { AlertComponent } from '../../../components/alert/alert.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UxserviceService } from 'src/app/shared/services/uxservice.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private auth: Auth,
    private uxService:UxserviceService,
    private afs: Firestore,
    private _snackBar: MatSnackBar
  ) { }

  onNavigationfrmDashboard(val:any) {
    switch (val) {
      case 'supplierList': {
        this.router.navigate(['/admin/suppliertab']);
        break;
      }

      case 'manage': {
        this.router.navigate(['/admin/admin-documentation']);
        break;
      }
    }
  }

  addSupplier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Invite Supplier',
      buttonName: 'Invite'
    }
    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);
    dialogRef.afterClosed()
      // .pipe(this.toast.observe({
      //   loading: 'Inviting Supplier...',
      //   success: 'Successfully Invited',
      //   error: 'There was an error in inviting the Supplier',
      // }))
      .subscribe(async data => {
        if (data) {
          console.log(data);
          try {
            const credential = await createUserWithEmailAndPassword(
              this.auth,
              data.email,
              data.password);
            await updateProfile(
              credential.user, {
              displayName: data.displayName,}
            );
            console.log(credential.user);
            this.updateUserCollection(credential,data);
            this.uxService.openSnackBar('Successfully Invited!!!', 'Ok');
          }catch (e: any) {
            console.error(e.message);
            this.uxService.openSnackBar(e.message, 'SnackBar');
          }
        }
      })
  }

  updateUserCollection = async (credential: any, data :any) => {
    const userRef = doc(this.afs, 'users-list', credential.user.uid);

    try {
      await setDoc(userRef, {
        displayName: credential.user.displayName,
        uid: credential.user.uid,
        email: credential.user.email,
        role: data.role,
        createdAt: credential.user.metadata.creationTime,
        lastloginat: credential.user.metadata.lastLoginAt,
        mobile: data.mobile,
        companyname: data.companyname,
        supervisoremail: data.supervisoremail,
        period: data.period,
        comments: data.comments,
      });

    } catch (e: any) {
      console.error(e.message);
      this.uxService.openSnackBar('Login Failed !!!', 'Try Again');
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

    dialogRef.afterClosed()
      .pipe(this.toast.observe({
        success: 'Successfully LogOut',
        loading: 'Logging out...',
        error: 'Please Check the entered details.',
      }))
      .subscribe(data => {
        if (data) {
          // this.supplierService.deleteSupplier(row);
          // console.log(row);
          this.authService.logout().subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/loginuser']);
            location.reload();
          });

          // this.openSnackBar("LogOut Successfully!", "OK")
        }
      })

  }
}
