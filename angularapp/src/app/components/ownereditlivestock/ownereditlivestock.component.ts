import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock.model';
import { LivestockService } from 'src/app/services/livestock.service';

declare var $: any;

@Component({
    selector: 'app-ownereditlivestock',
    templateUrl: './ownereditlivestock.component.html',
    styleUrls: ['./ownereditlivestock.component.css'],
    standalone: false
})
export class OwnereditlivestockComponent implements OnInit {

  id:number;
  extLivestock:Livestock={LivestockId:0,Name:'',Species:'',Age:0,Breed:'',HealthCondition:'',Location:'',VaccinationStatus:'',UserId:0};
  // extLivestock1:Livestock={LivestockId:0,Name:'',Species:'',Age:0,Breed:'',HealthCondition:'',Location:'',VaccinationStatus:'',UserId:0};
  formSubmitted=false;
  message:string;
  isModalOpen:boolean=false;

  constructor(private service:LivestockService ,private  route:ActivatedRoute, private router:Router) { }

  
  
  ngOnInit(): void {
    this.route.params.subscribe(
      params=>this.id=params.id
    );
    this.service.getLivestockByID(this.id).subscribe(
      data=>{this.extLivestock=data;
      // this.extLivestock1=data
    },
      error=>console.log(error)
    )
  }

  medicinesAreEqual(livestock1: Livestock, livestock2: Livestock): boolean {
    return JSON.stringify(livestock1) === JSON.stringify(livestock2);
  }

  updateLivestock(){
    console.log(this.extLivestock)
    // console.log(this.extLivestock1)
    this.service.updateLivestock(this.id,this.extLivestock).subscribe(
      data=>{
        this.isModalOpen=true;
          console.log(data)
          this.isModalOpen = true;
          $('#successModal').modal('show');
      },
      err=>console.log(err)
    );
    this.router.navigate(['/viewlivestock']);
  }
  isFieldInvalid(control: string): boolean {
    if (this.extLivestock[control] == '' && (this.extLivestock[control].touched || this.formSubmitted)) {
      return true;
    }
    else {
      return false;
    }
  }
  clickOk(){
    this.router.navigate(['/viewlivestock'])

  }
  isFormValid():boolean{
    if(this.isFieldInvalid('Name')|| this.isFieldInvalid('Species')|| this.isFieldInvalid('Age') || this.isFieldInvalid('Breed') || this.isFieldInvalid('HealthCondition') || this.isFieldInvalid('Location') || this.isFieldInvalid('VaccinationStatus') || this.isFieldInvalid('UserId'))
    return false;
    else
    return true;
  }



}

