import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { Supplier } from 'src/app/shared/interface/supplier';
import { DeleteSupplierComponent } from './delete-supplier/delete-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { UxserviceService } from 'src/app/shared/services/uxservice.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {
  allUsers !: Observable<Array<any>>
  currentuid: any = '';
  user$ = this.usersService.currentUserProfile$;
  suppliersArr: Supplier[] = [];
  displayedColumns: string[] = ['id', 'companyname', 'displayName', 'email', 'mobile', 'supervisoremail', 'role', 'action'];
  dataSource!: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private toast: HotToastService,
    private usersService: UsersService,
    private auth: Auth,
    private uxService:UxserviceService,
    private afs: Firestore,
    private router: Router
  ) { this.loadUsers(); }

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getCurrentUser();

  }

  async getCurrentUser() {
    await this.supplierService.getUserDetails().then(async (res: any) => {
      this.currentuid = res.uid;
      console.log(this.currentuid);

    })
  }

  loadUsers() {
    this.allUsers = this.usersService.loadUsers()
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
      .pipe(this.toast.observe({
        loading: 'Inviting Supplier...',
        success: 'Successfully Invited',
        error: 'There was an error in inviting the Supplier',
      }))
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
  getAllSuppliers() {
    this.supplierService.getSupplier().subscribe(suppliersArr => {
      this.suppliersArr = suppliersArr;
      console.log(this.suppliersArr);

      this.dataSource = new MatTableDataSource(this.suppliersArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  viewSupplier(row: any) {
    // window.open('/view_supplier/' + row.patient_id, '_blank');

    if (row.id == null || row.displayName == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.position = { right: '1px' };
    dialogConfig.width = "55%"
    // dialogConfig.data.tittle = "View Supplier",
    // dialogConfig.data.buttonName = 'Update';
    //dialogConfig.data.purdate = row.purdate.toDate();

    console.log(dialogConfig.data);
    const dialogRef = this.dialog.open(ViewSupplierComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.usersService.getSupplierDetails();
        console.log(data);

        // this.openSnackBar("Supplier is updated successfully.", "OK")
      }
    })
  }

  editSupplier(row: any) {
    if (row.id == null || row.displayName == null) {
      return;

    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.tittle = "Edit Supplier",
      dialogConfig.data.buttonName = 'Update';

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(this.toast.observe({
        loading: 'Editing Supplier...',
        success: 'Successfully Edited',
        error: 'There was an error in editing the Supplier',
      }))
      .subscribe(data => {

        if (data) {
          this.supplierService.updateSupplier(data);
          console.log(data);

          // this.openSnackBar("Supplier is updated successfully.", "OK")
        }
      })
  }

  async deleteSupplier(row: Supplier) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Delete Supplier',
      supplierName: row.name
    }

    const dialogRef = this.dialog.open(DeleteSupplierComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        this.toast.observe({
          loading: 'Deleting Supplier...',
          success: 'Successfully Deleted',
          error: 'There was an error in deleting the Supplier',
        })
      ).subscribe(data => {
        if (data) {
          this.supplierService.deleteSupplier(row);
          console.log(row);

          //  this.openSnackBar("Supplier deleted Successfully!", "OK")
        }
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getProductStatus(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    if (row) {
      if (row == 'active') {
        return {
          color: "accent",
          status: `Active`
        };
      } else
        return {
          color: "primary",
          status: `Deleted`
        };
    } else
      return {
        color: "warn",
        status: `Inactive`
      };
  }
}

