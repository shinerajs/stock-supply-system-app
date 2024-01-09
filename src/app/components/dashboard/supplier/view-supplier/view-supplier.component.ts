import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})
export class ViewSupplierComponent {
  patient_id !: any;
  patientObj !: any;

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataService
  ) {
    this.patient_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getSupplierById();
  }

  getSupplierById() {
    this.dataApi.getSupplierById(this.patient_id).subscribe(res => {
      this.patientObj = res;
      this.patientObj.admission_date = this.patientObj.admission_date.toDate();
      console.log(res);
    })
  }
}
