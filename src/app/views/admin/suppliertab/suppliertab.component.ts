import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from 'src/app/shared/services/users.service';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UxserviceService } from 'src/app/shared/services/uxservice.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-suppliertab',
  templateUrl: './suppliertab.component.html',
  styleUrls: ['./suppliertab.component.scss']
})
export class SuppliertabComponent {
  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private usersServices: UsersService,
    private toast: HotToastService,
    private auth: Auth,
    private uxService:UxserviceService,
    private afs: Firestore,
  ) { }

  // addSupplier() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     tittle: 'Invite Supplier',
  //     buttonName: 'Invite'
  //   }
  //   const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

  //   dialogRef.afterClosed()
  //     .pipe(this.toast.observe({
  //       loading: 'Inviting Supplier...',
  //       success: 'Successfully Invited',
  //       error: 'There was an error in inviting the Supplier',
  //     }))
  //     .subscribe(data => {
  //       if (data) {
  //         console.log(data);
  //         this.supplierService.addSupplier(data);
  //         // this.usersServices.addSupplier(data);
  //       }
  //     })
  // }

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
          // this.supplierService.addSupplier(data);
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
            //this.isSubmitting = false;
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
      // const docSnap = await getDoc(userRef);
      // if (docSnap.exists()) {
      //   localStorage.setItem('user', JSON.stringify(docSnap.data()));
      //   location.reload();
      //   //this.router.navigate(['/admin/suppliertab']);
      // }
    } catch (e: any) {
      console.error(e.message);
      //this.isSubmitting = false;
      this.uxService.openSnackBar('Login Failed !!!', 'Try Again');
    }
  }

}

