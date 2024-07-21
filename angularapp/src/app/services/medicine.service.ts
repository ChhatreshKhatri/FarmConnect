import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  apiUrl:string='http://localhost:8080';

  constructor(private http: HttpClient) { }
  addMedicine(requestObject: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.apiUrl + '/api/medicine', requestObject, { responseType: 'text' as 'json' });
  }
  getMedicineByUserID(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(this.apiUrl + '/api/medicine/' + id);
  }
  getMedicineById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(this.apiUrl + '/api/medicine/' + id);
  }
  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl + '/api/medicine');
  }
  deleteMedicine(medicineId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/api/medicine/' + medicineId, { responseType: 'text' as 'json' });
  }
  updateMedicine(id: number, requestObject: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(this.apiUrl + '/api/medicine/' + id, requestObject, { responseType: 'text' as 'json' });
  }

}
