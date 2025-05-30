import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
    selector: 'app-useraddfeedback',
    templateUrl: './useraddfeedback.component.html',
    styleUrls: ['./useraddfeedback.component.css'],
    standalone: false
})
export class UseraddfeedbackComponent implements OnInit {

  feedback:Feedback={FeedbackId:0,UserId:0,FeedbackText:'',Date:null};
  submit:boolean=false;

  constructor(private service:FeedbackService,private authservice:AuthService,private router:Router) { }

  addFeedback(){
    this.submit=true;
    if(this.feedback.FeedbackText!=''){
    this.feedback.Date=new Date;
    this.service.addFeedback(this.feedback).subscribe(
      data=>this.feedback=data,
      err=>console.log(err)
    )
    this.router.navigate(['/userviewfeedback']);
    }
  }

  ngOnInit(): void {
    this.authservice.getUserId().subscribe(
      data=>this.feedback.UserId=+data
    )
  }

}
