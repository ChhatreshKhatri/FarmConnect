import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livestock } from '../models/livestock.model';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {
  private apiUrl:string='http://localhost:8080';

  constructor(private  http:HttpClient) { }

  getAllLivestocks():Observable<Livestock[]>
  {
    return this.http.get<Livestock[]>(this.apiUrl+'/api/livestock');
  }
  getLivestockByUserID(id: number): Observable<Livestock[]>
  {
    
    return this.http.get<Livestock[]>(this.apiUrl+'/api/livestock/user/'+id);
  }

  
  getLivestockByID(id: number): Observable<Livestock>
  {
    return this.http.get<Livestock>(this.apiUrl+'/api/livestock/'+id);

  }
  addLivestock(livestock: Livestock): Observable<Livestock>
  {
    return this.http.post<Livestock>(this.apiUrl+'/api/livestock',livestock,{responseType:'text' as 'json'});
  }
  updateLivestock(id: number, livestock: Livestock): Observable<Livestock>
  {
    return this.http.put<Livestock>(this.apiUrl+'/api/livestock/'+id,livestock,{responseType:'text' as 'json'})
  }
  deleteLivestock(id: number): Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'/api/livestock/'+id,{responseType:'text' as 'json'});

  }




}
