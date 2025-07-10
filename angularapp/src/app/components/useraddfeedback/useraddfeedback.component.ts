import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Feedback } from '../../models/feedback.model';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class UseraddfeedbackComponent implements OnInit {
  feedback: Feedback = {
    FeedbackText: '',
    Date: new Date(),
    UserId: 0
  };

  formSubmitted = false;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe({
      next: (data: number) => {
        this.feedback.UserId = data;
      },
      error: (err: any) => {
        console.error('Error getting user ID:', err);
      }
    });
  }

  isFieldInvalid(field: keyof Feedback): boolean {
    const value = this.feedback[field];
    if (value === '' && this.formSubmitted) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.feedback.FeedbackText.trim() === '') {
      return;
    }
    this.feedbackService.addFeedback(this.feedback).subscribe({
      next: (data: Feedback) => {
        this.feedback = data;
        console.log('Feedback added successfully');
      },
      error: (err: any) => {
        console.error('Error adding feedback:', err);
      }
    });
  }
}
