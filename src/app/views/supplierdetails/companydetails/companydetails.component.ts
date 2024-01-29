//import { LiveAnnouncer } from '@angular/cdk/a11y';
//import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
//import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProfileUser } from 'src/app/shared/interface/user';
@UntilDestroy()
@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.scss']
})


export class CompanydetailsComponent {
  // isSubmitting = true;
  selectedPage = '';
  routerURL = '';
  selectRole: any = '';
  currentuid: any = '';
  data !: any;
  user$ = this.usersService.currentUserProfile$;
  companyname : string = '';
  form = this.fb.group({
    uid: [''],
    companyname : [''],
    regaddress: [''],
    tradeaddress: [''],
    town: [''],
    country: [''],
    postcode: [''],
    mobile: [''],
    email: [''],
    supervisoremail: [''],
    accountnumber: [''],
    ifsccode: [''],
    vatnumber: [''],
    companyregnum: [''],
    name: [''],
    position: [''],
    contactnum: [''],

  });


  constructor(
    private fb: NonNullableFormBuilder,
    private toast: HotToastService,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.form.patchValue({ ...user });
      });
    this.activatedRoute.queryParams.subscribe((qp) => {
      this.selectedPage = qp['section'];
    });
    this.getCurrentUser();
  }

  async getCurrentUser() {
    await this.usersService.getUserDetails().then(async (res: any) => {
      if (res) {
        this.currentuid = res.uid;
      }
    })
  }


  saveSupplierDetails() {
    console.log(this.form.value);
    // this.isSubmitting = false;
    
    const { uid, ...data } = this.form.value;

    if (!uid) {
      return;
    }
    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe((res)=> {
        console.log(res);  
      });
    
  }

}
