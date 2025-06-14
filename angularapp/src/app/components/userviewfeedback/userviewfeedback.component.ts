import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Feedback } from '../../models/feedback.model';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
    selector: 'app-userviewfeedback',
    templateUrl: './userviewfeedback.component.html',
    styleUrls: ['./userviewfeedback.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class UserviewfeedbackComponent implements OnInit {

  userId: number = 0;
  feedbacks: Feedback[] = [];
  feedbackId: number = 0;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe({
      next: (data: number) => {
        this.userId = data;
        this.loadFeedbacks();
      },
      error: (err: any) => {
        console.error('Error getting user ID:', err);
      }
    });
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbackByUserId(this.userId).subscribe({
      next: (data: Feedback[]) => {
        this.feedbacks = data;
      },
      error: (err: any) => {
        console.error('Error loading feedbacks:', err);
      }
    });
  }

  delete(id: number): void {
    this.feedbackId = id;
  }

  deleteconfirm(): void {
    if (this.feedbackId) {
      this.feedbackService.deleteFeedback(this.feedbackId).subscribe({
        next: () => {
          this.loadFeedbacks();
          this.feedbackId = 0;
        },
        error: (err: any) => {
          console.error('Error deleting feedback:', err);
        }
      });
    }
  }
}
