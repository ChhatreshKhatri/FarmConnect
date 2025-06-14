import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Request } from '../../models/request.model';

@Component({
    selector: 'app-ownerviewrequest',
    templateUrl: './ownerviewrequest.component.html',
    styleUrls: ['./ownerviewrequest.component.css'],
    standalone: false
})
export class OwnerviewrequestComponent implements OnInit {
  requests: Request[] = [];
  UserId: number = 0;
  requestId: number = 0;

  constructor(private service: RequestService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.getUserId().subscribe({
      next: (data: string) => {
        this.UserId = +data;
        this.loadRequests();
      },
      error: (error: any) => console.log(error)
    });
  }

  loadRequests() {
    this.service.getRequestsByUserID(this.UserId).subscribe({
      next: (data: Request[]) => {
        this.requests = data;
      },
      error: (error: any) => console.log(error)
    });
  }

  deleteconfirm() {
    this.service.deleteRequest(this.requestId).subscribe({
      next: () => this.loadRequests(),
      error: (error: any) => console.log(error)
    });
  }

  delete(requestId: number) {
    this.requestId = requestId;
  }
}
