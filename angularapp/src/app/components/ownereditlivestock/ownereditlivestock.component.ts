import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livestock } from '../../models/livestock.model';
import { LivestockService } from '../../services/livestock.service';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-ownereditlivestock',
    templateUrl: './ownereditlivestock.component.html',
    styleUrls: ['./ownereditlivestock.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class OwnereditlivestockComponent implements OnInit {
  id: number = 0;
  extLivestock: Livestock = {
    LivestockId: 0,
    Name: '',
    Species: '',
    Age: 0,
    Breed: '',
    HealthCondition: '',
    Location: '',
    VaccinationStatus: '',
    UserId: 0
  };
  // extLivestock1:Livestock={LivestockId:0,Name:'',Species:'',Age:0,Breed:'',HealthCondition:'',Location:'',VaccinationStatus:'',UserId:0};
  formSubmitted: boolean = false;
  message: string = '';
  isModalOpen: boolean = false;

  constructor(
    private service: LivestockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => {
        this.id = +params['id'];
        this.service.getLivestockByID(this.id).subscribe({
          next: (data: Livestock) => {
            this.extLivestock = data;
            // this.extLivestock1=data
          },
          error: (error: any) => console.log(error)
        });
      },
      error: (error: any) => console.log(error)
    });
  }

  medicinesAreEqual(livestock1: Livestock, livestock2: Livestock): boolean {
    return JSON.stringify(livestock1) === JSON.stringify(livestock2);
  }

  updateLivestock() {
    console.log(this.extLivestock)
    // console.log(this.extLivestock1)
    this.service.updateLivestock(this.id, this.extLivestock).subscribe({
      next: (data: Livestock) => {
        this.isModalOpen = true;
        $('#successModal').modal('show');
      },
      error: (error: any) => console.log(error)
    });
    this.router.navigate(['/viewlivestock']);
  }

  isFieldInvalid(control: keyof Livestock): boolean {
    if (this.extLivestock[control] === '' && (this.formSubmitted)) {
      return true;
    }
    return false;
  }

  clickOk() {
    this.router.navigate(['/viewlivestock']);
  }

  isFormValid(): boolean {
    return !(
      this.isFieldInvalid('Name') ||
      this.isFieldInvalid('Species') ||
      this.isFieldInvalid('Age') ||
      this.isFieldInvalid('Breed') ||
      this.isFieldInvalid('HealthCondition') ||
      this.isFieldInvalid('Location') ||
      this.isFieldInvalid('VaccinationStatus') ||
      this.isFieldInvalid('UserId')
    );
  }
}

