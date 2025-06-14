import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/api/feedback`;

  constructor(private http: HttpClient) { }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getFeedbackByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${feedback.FeedbackId}`, feedback);
  }

  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}