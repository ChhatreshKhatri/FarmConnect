import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Livestock } from 'src/app/models/livestock.model';
import { LivestockService } from 'src/app/services/livestock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { FeedService } from 'src/app/services/feed.service';
import { Medicine } from 'src/app/models/medicine.model';
import { Feed } from 'src/app/models/feed.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';


declare var bootstrap: any;

@Component({
    selector: 'app-requestform',
    templateUrl: './requestform.component.html',
    styleUrls: ['./requestform.component.css'],
    standalone: false
})
export class RequestformComponent implements OnInit {

  // @ViewChild('exampleModal') exampleModal: ElementRef;
  medicine:Medicine;
  feed:Feed;
  type:string='';//Medicine,Feed
  id:number;
  name:string;
  newRequest:Request={RequestId:0,RequestType:'',MedicineId:null,FeedId:null,UserId:0,Quantity:0,Status:'Pending',LivestockId:0,RequestDate:''}


  myLivestocks:Livestock[];
  constructor(private datepipe: DatePipe,private service:RequestService,private livestockService:LivestockService,private router:Router,private route:ActivatedRoute,private medicineService:MedicineService,private feedService:FeedService,private authService:AuthService) { }


  ngOnInit(): void {
    this.authService.getUserId().subscribe(
      data=>this.newRequest.UserId=+data
    )
    
    this.route.params.subscribe(
      params=>{this.type=params.type;
        this.id=params.id;
        if(this.type=="Medicine"){
          this.medicineService.getMedicineById(this.id).subscribe(
            data=>{this.medicine=data,
              this.name=this.medicine.MedicineName,
              console.log(data)
              this.newRequest.MedicineId=this.id
              this.type="Medicine"
            },
          error=>console.log(error)
        )
      }
      else{
        this.feedService.getFeedById(this.id).subscribe(
          data=>{this.feed=data
            this.name=this.feed.FeedName,
            this.newRequest.FeedId=this.id,
            this.type="Feed"
          },
          err=>console.log(err)
          )
        }
      }
      );
      this.newRequest.RequestType=this.type;
      // console.log(this.type,this.name)

      this.getLivestockslist();

  }
  onsubmit()
  {
    //  var myModal = new bootstrap.Modal(this.exampleModal.nativeElement, {});
    //  myModal.show();
    console.log(this.newRequest)
    this.newRequest.RequestDate=this.datepipe.transform(new Date, 'yyyy-MM-dd');
    this.service.addRequest(this.newRequest).subscribe(
      data=>this.newRequest=data,
      err=>console.log(err)
    )
    this.router.navigate(['/ownerviewrequest']);
  }
  cancel()
  {
    if(this.type=='Feed')
    this.router.navigate(['/ownerviewfeed']);
  else
  this.router.navigate(['/ownerviewmedicine']);
  }
  getLivestockslist()
  {
    this.livestockService.getAllLivestocks().subscribe(
      data=> {this.myLivestocks=data
      console.log(this.myLivestocks)},
      err=>console.log(err)
    )
  }

}
