import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/interfaces/supplier';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveSuppliers(supplierDetails: Supplier) {
    return this.http.post(`${this.baseUrl}/suppliers`, supplierDetails)
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.baseUrl}/suppliers`)
  }

  editSupplier(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.http.post(`${this.baseUrl}/suppliers`, postData);
    } else {
      return this.http.put(`${this.baseUrl}/suppliers/${selectedPdt.id}`, postData);
    }
  }

  deleteSupplier(supplierId: number) {
    return this.http.delete(`${this.baseUrl}/suppliers/${supplierId}`);
  }

}


// private baseUrl = 'http://localhost:3000';


// constructor(private http: HttpClient) { }

// registerUser(userDetails: User) {
//   return this.http.post(`${this.baseUrl}/users`, userDetails);
// }

// getUserByEmail(email: string): Observable<User[]> {
//   return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
// }
