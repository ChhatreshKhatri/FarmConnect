import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Livestock } from '../../models/livestock.model';
import { LivestockService } from '../../services/livestock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../models/request.model';
import { MedicineService } from '../../services/medicine.service';
import { FeedService } from '../../services/feed.service';
import { Medicine } from '../../models/medicine.model';
import { Feed } from '../../models/feed.model';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
    selector: 'app-requestform',
    templateUrl: './requestform.component.html',
    styleUrls: ['./requestform.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class RequestformComponent implements OnInit {
  medicine: Medicine | undefined;
  feed: Feed | undefined;
  type: string = ''; // Medicine, Feed
  id: number = 0;
  name: string = '';
  newRequest: Request = {
    RequestId: 0,
    RequestType: '',
    MedicineId: 0,
    FeedId: 0,
    UserId: 0,
    Quantity: 0,
    Status: 'Pending',
    LivestockId: 0,
    RequestDate: ''
  };

  myLivestocks: Livestock[] = [];

  constructor(
    private datepipe: DatePipe,
    private service: RequestService,
    private livestockService: LivestockService,
    private router: Router,
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private feedService: FeedService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserId().subscribe({
      next: (data: string) => this.newRequest.UserId = +data,
      error: (error: any) => console.log(error)
    });
    
    this.route.params.subscribe({
      next: (params: any) => {
        this.type = params['type'];
        this.id = +params['id'];
        
        if (this.type === "Medicine") {
          this.medicineService.getMedicineById(this.id).subscribe({
            next: (data: Medicine) => {
              this.medicine = data;
              this.name = this.medicine.MedicineName;
              this.newRequest.MedicineId = this.id;
              this.type = "Medicine";
            },
            error: (error: any) => console.log(error)
          });
        } else {
          this.feedService.getFeedById(this.id).subscribe({
            next: (data: Feed) => {
              this.feed = data;
              this.name = this.feed.FeedName;
              this.newRequest.FeedId = this.id;
              this.type = "Feed";
            },
            error: (error: any) => console.log(error)
          });
        }
      },
      error: (error: any) => console.log(error)
    });

    this.newRequest.RequestType = this.type;
    this.getLivestockslist();
  }

  onsubmit() {
    this.newRequest.RequestDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.service.addRequest(this.newRequest).subscribe({
      next: (data: Request) => {
        this.newRequest = data;
        this.router.navigate(['/ownerviewrequest']);
      },
      error: (error: any) => console.log(error)
    });
  }

  cancel() {
    if (this.type === 'Feed') {
      this.router.navigate(['/ownerviewfeed']);
    } else {
      this.router.navigate(['/ownerviewmedicine']);
    }
  }

  getLivestockslist() {
    this.livestockService.getAllLivestocks().subscribe({
      next: (data: Livestock[]) => {
        this.myLivestocks = data;
      },
      error: (error: any) => console.log(error)
    });
  }
}
