import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  addFeed(requestObject: Feed): Observable<Feed>
  {
    return this.http.post<Feed>(this.apiUrl+'/api/feed',requestObject,{ responseType: 'text' as 'json' });
    
  }
  getFeedByUserID(id: number): Observable<Feed>
  {
    return this.http.get<Feed>(this.apiUrl+'/api/feed/user/'+id);

  }
  getFeedById(id: number): Observable<Feed>
  {
    return this.http.get<Feed>(this.apiUrl+'/api/feed/'+id);

  }
  getAllFeed(): Observable<Feed[]>
  {
    return this.http.get<Feed[]>(this.apiUrl+'/api/feed');

  }
  deleteFeed(feedId: number): Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'/api/feed/'+feedId);

  }
  updateFeed(id: number, requestObject: Feed): Observable<Feed>
  {
    return this.http.put<Feed>(this.apiUrl+'/api/feed/'+id,requestObject,{ responseType: 'text' as 'json' });

  }
}
