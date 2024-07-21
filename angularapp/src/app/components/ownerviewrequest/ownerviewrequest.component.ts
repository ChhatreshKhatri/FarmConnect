import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Request } from '../../models/request.model';

 

@Component({
  selector: 'app-ownerviewrequest',
  templateUrl: './ownerviewrequest.component.html',
  styleUrls: ['./ownerviewrequest.component.css']
})
export class OwnerviewrequestComponent implements OnInit {
  requests: Request[];
  UserId: number;
  requestId:number;

  constructor(private service: RequestService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.getUserId().subscribe(
      data=>this.UserId=+data,
      error=>console.log(error)
    )
    this.loadRequests();
  }
  loadRequests() {
    this.service.getRequestsByUserID(this.UserId).subscribe(
      data => {
        this.requests = data;
        // console.log(this.requests);
      },
      error => console.log(error)

    );
  }


  deleteconfirm(){
    this.service.deleteRequest(this.requestId).subscribe(
      )
  }
  delete(requestId: number) {
    this.requestId=requestId;
  }


}
