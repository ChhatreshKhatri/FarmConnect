import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
 
@Injectable({
  providedIn: 'root'
})
export class RequestService {
 

  private apiUrl = 'http://localhost:8080';
 
  constructor(private http: HttpClient) { }
 
  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }

  getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>(this.apiUrl+'/api/request');
  }

  getRequestById(requestId:number):Observable<Request>{
    return this.http.get<Request>(this.apiUrl+'/api/request/'+requestId);
  }
 
  addRequest(request: Request): Observable<Request> {
return this.http.post<Request>(this.apiUrl+'/api/request',request );
  }
 
  getRequestsByUserID(userID: number): Observable<Request[]> {
    
    return this.http.get<Request[]>(this.apiUrl+'/api/request/user/'+userID);
  }
 
  deleteRequest(requestID: number): Observable<any> {
    
    return this.http.delete<any>(this.apiUrl+'/api/request/'+requestID, { responseType: 'text' as 'json' });
  }
 
  getRequestByMedicineOrFeedUserID(userID: number): Observable<Request[]> {

    return this.http.get<Request[]>(this.apiUrl+'/api/request/user/'+userID+'/medicines-or-feeds');
  }
 
  updateRequestStatus(requestID: number, status: Request): Observable<boolean> {
    
    return this.http.put<boolean>(this.apiUrl+'/api/request/'+requestID,status, { responseType: 'text' as 'json' })
  }
}