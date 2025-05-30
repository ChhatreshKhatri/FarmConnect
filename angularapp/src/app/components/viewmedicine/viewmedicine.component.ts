import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-viewmedicine',
    templateUrl: './viewmedicine.component.html',
    styleUrls: ['./viewmedicine.component.css'],
    standalone: false
})
export class ViewmedicineComponent implements OnInit {
  isModalOpen: boolean = false;
  searchQuery:string;
  medicinesMaster:Medicine[];
  medicines: Medicine[];
  selectedImage: string;
  deleteId: number;
  deleteText: string;

  constructor(private medService: MedicineService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadMedicine();
  }
  viewImage(image: string) {
    this.selectedImage = image;
  }


  loadMedicine() {
    this.medService.getAllMedicine().subscribe(
      (      data: Medicine[]) => {
        this.medicinesMaster= data;
        this.filterMedicines();
      },
      (      error: any) =>{console.log(error);
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

  onDelete(id: number) {
    this.isModalOpen = true;
    this.deleteId = id;
    $('#deleteModal').modal('show');
  }
  Delete(id: number) {
    this.medService.deleteMedicine(id).subscribe(
      (      data: any)=>{
        this.loadMedicine();
        this.isModalOpen = false;
        $('#deleteModal').modal('hide');
      },
      (      error: { error: string; })=>{
        console.log(error)
        this.deleteText=error.error;
        // this.isModalOpen = false;
        // $('#deleteModal').modal('hide');
      }
    )

  }
  Cancel() {
    this.isModalOpen = false;
  }
}


