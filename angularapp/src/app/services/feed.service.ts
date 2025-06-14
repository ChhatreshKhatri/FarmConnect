import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = `${environment.apiUrl}/api/feed`;

  constructor(private http: HttpClient) { }

  getAllFeed(): Observable<Feed[]> {
    return this.http.get<Feed[]>(this.apiUrl);
  }

  getFeedById(id: number): Observable<Feed> {
    return this.http.get<Feed>(`${this.apiUrl}/${id}`);
  }

  addFeed(feed: Feed): Observable<Feed> {
    return this.http.post<Feed>(this.apiUrl, feed);
  }

  updateFeed(feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(`${this.apiUrl}/${feed.FeedId}`, feed);
  }

  deleteFeed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFeedByUserID(id: number): Observable<Feed> {
    return this.http.get<Feed>(`${this.apiUrl}/user/${id}`);
  }

  getFeeds(): Observable<Feed[]> {
    return this.getAllFeed();
  }
}
