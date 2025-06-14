import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.apiUrl}/api/request`;

  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`);
  }

  updateRequestStatus(id: number, request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: number): Observable<Request[]> {
    return this.http.delete<Request[]>(`${this.apiUrl}/${id}`);
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  getRequestsByUserID(userID: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/user/${userID}`);
  }

  getRequestByMedicineOrFeedUserID(userID: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/user/${userID}/medicines-or-feeds`);
  }
}