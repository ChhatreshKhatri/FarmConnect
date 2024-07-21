import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl:string="http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.apiUrl+'/api/feedback');
  }

  getAllfeedbacksByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.apiUrl+'/api/feedback/user/'+userId);
  }

  addFeedback(feedback:Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(this.apiUrl+'/api/feedback',feedback);
  }

  deleteFeedback(feedbackId:number):Observable<void>{
    return this.http.delete<void>(this.apiUrl+'/api/feedback/'+feedbackId);
  }
  
}