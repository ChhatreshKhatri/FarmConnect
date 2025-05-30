import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ownerviewmedicine',
    templateUrl: './ownerviewmedicine.component.html',
    styleUrls: ['./ownerviewmedicine.component.css'],
    standalone: false
})
export class OwnerviewmedicineComponent implements OnInit {

  UserId:number;
  medicines:Medicine[];
  medicinesMaster:Medicine[];
  medicineToDelete:Medicine;
  searchQuery:string;

  constructor(private service:MedicineService,private  router:Router) { }
 
  ngOnInit(): void {
    this.viewMedicines();
  }

  viewMedicines() {
    this.service.getAllMedicine().subscribe(
      data => {
        this.medicinesMaster = data;
        this.filterMedicines();
      },
      error => {
        console.log(error);
      }
    );
  }
  filterMedicines() {
    if (!this.searchQuery) {
      this.medicines = this.medicinesMaster;
    } else {
      this.medicines = this.medicinesMaster.filter(medicine =>
        medicine.MedicineName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        medicine.Brand.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openDeleteModal(medicine: Medicine): void 
  {
    this.medicineToDelete=medicine;
    const deleteModal: any = document.getElementById('deleteModal');
    deleteModal.style.display= 'block';
  }
  closeDeleteModal():void {
    const deleteModal :any =document.getElementById('deleteModal');
    deleteModal.style.display ='none';

  }
  confirmDelete(): void
  {
    this.deleteMedicine(this.medicineToDelete.MedicineId);
  }
  deleteMedicine(id:number):void{
    this.service.deleteMedicine(id).subscribe(
      ()=>{
        this.viewMedicines();
        this.router.navigate(['/ownerview'])
      },
      error=>
      {
        console.log(error);
      }
    );
  }
 
}
