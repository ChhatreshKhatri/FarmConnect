import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  userId:number;
  feedbacks:Feedback[];
  feedbackId:number;

  constructor(private service:FeedbackService,private authservice:AuthService,private router:Router) { }
  
  getAllfeedbacksByUserId(){
    this.service.getAllfeedbacksByUserId(this.userId).subscribe(
      data=>{this.feedbacks=data,
      console.log(this.feedbacks)},
      err=>console.log(err)
    )
  }

  delete(deleteid:number){
    this.feedbackId=deleteid;
    // console.log(deleteid);
  }

  deleteconfirm(){
    this.service.deleteFeedback(this.feedbackId).subscribe();
    this.router.navigate(['/userviewfeedback']);
  }



  ngOnInit(): void {
    this.authservice.getUserId().subscribe(
      data=>this.userId=+data
    )
    this.getAllfeedbacksByUserId();
  }


}
