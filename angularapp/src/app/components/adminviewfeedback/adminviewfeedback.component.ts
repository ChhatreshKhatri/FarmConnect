import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-adminviewfeedback',
    templateUrl: './adminviewfeedback.component.html',
    styleUrls: ['./adminviewfeedback.component.css'],
    standalone: true,
    imports: [DatePipe]
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  users: { [key: number]: User } = {};
  selectedUser: User | null = null;
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data: Feedback[]) => {
        this.feedbacks = data;
        // Load user details for each feedback
        this.feedbacks.forEach(feedback => {
          this.http.get<User>(`${this.apiUrl}/${feedback.UserId}`).subscribe({
            next: (user: User) => {
              this.users[feedback.UserId] = user;
            },
            error: (error: Error) => console.error('Error loading user:', error)
          });
        });
      },
      error: (error: Error) => console.error('Error loading feedbacks:', error)
    });
  }

  details(userId: number): void {
    this.selectedUser = this.users[userId];
  }
}
