import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { error } from 'console';
import { Livestock } from 'src/app/models/livestock.model';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-supplierrequests',
  templateUrl: './supplierrequests.component.html',
  styleUrls: ['./supplierrequests.component.css']
})
export class SupplierrequestsComponent implements OnInit {

  constructor(private service:RequestService,private router:Router) { }

  searchQuery:string;
  requestsMaster:Request[];
  livestock:Livestock={LivestockId:0,Name:'',Species:'',Age:0,Breed:'',HealthCondition:'',Location:'',VaccinationStatus:'',UserId:0};
  requestId:number;
  requests:Request[];
  request:Request={RequestId:0,RequestType:'',MedicineId:null,FeedId:null,UserId:0,Quantity:0,Status:'',LivestockId:0,RequestDate:''};
  
  loadRequests(){
    this.service.getAllRequests().subscribe(
      data=>{
        this.requestsMaster = data;
        this.filterRequests();
           
      },
      

    )
  }

  details(livestock:Livestock){
    this.livestock=livestock
  }
  
  approve(requestId:number){
    // console.log('in approve');
    this.requestId=requestId;
    this.request.RequestDate='2024-09-08';
    this.service.getRequestById(requestId).subscribe(
      data=>{this.request=data
        this.request.Status="Approved";
        console.log('in getrequest');
        this.service.updateRequestStatus(this.requestId,this.request).subscribe(
          data=>console.log('getobject',this.request),
          // error=>console.log(error)
        )},
      error=>console.log(error)
    )
    
  }

  filterRequests() {
    if (!this.searchQuery) {
      this.requests = this.requestsMaster;
    } else {
      this.requests = this.requestsMaster.filter(request =>
        request.RequestType.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    
      );
    }
  }

  reject(requestId:number){
    this.requestId=requestId;
    this.request.RequestDate='2024-09-08';
    this.service.getRequestById(requestId).subscribe(
      data=>{this.request=data
        this.request.Status="Rejected";
        console.log('in getrequest');
        this.service.updateRequestStatus(this.requestId,this.request).subscribe(
          data=>console.log('getobject',this.request),
          // error=>console.log(error)
        )},
      error=>console.log(error)
    )
    
  }

  requestStatus():string{
    return this.request.Status
  }


  ngOnInit(): void {
    this.loadRequests();
  }


}
