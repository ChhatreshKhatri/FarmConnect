import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  allFeedbacks!: Feedback[];
  user:User={Email:'',Password:'',Username:'',MobileNumber:'',UserRole:''};

  constructor(private service: FeedbackService) { }

  getAllFeedbacks(): void {
    this.service.getAllFeedbacks().subscribe(
      data => {
        this.allFeedbacks = data;
        console.log(this.allFeedbacks);
      },
      err => console.log(err)
      )
  }

  details(user:User){
    this.user=user
  }

  ngOnInit(): void {
    this.getAllFeedbacks();
  }


}
