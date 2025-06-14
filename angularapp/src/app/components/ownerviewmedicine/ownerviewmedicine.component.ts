import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ownerviewmedicine',
  templateUrl: './ownerviewmedicine.component.html',
  styleUrls: ['./ownerviewmedicine.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class OwnerviewmedicineComponent implements OnInit {
  UserId: number = 0;
  medicines: Medicine[] = [];
  medicinesMaster: Medicine[] = [];
  medicineToDelete: Medicine = {
    MedicineId: 0,
    MedicineName: '',
    Brand: '',
    Category: '',
    Description: '',
    Quantity: 0,
    Unit: '',
    PricePerUnit: 0,
    Image: '',
    UserId: 0,
  };
  searchQuery: string = '';

  constructor(private service: MedicineService, private router: Router) {}

  ngOnInit(): void {
    this.viewMedicines();
  }

  viewMedicines() {
    this.service.getAllMedicine().subscribe(
      (data: any) => {
        this.medicinesMaster = data;
        this.filterMedicines();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  filterMedicines() {
    if (!this.searchQuery) {
      this.medicines = this.medicinesMaster;
    } else {
      this.medicines = this.medicinesMaster.filter(
        (medicine) =>
          medicine.MedicineName.toLowerCase().includes(
            this.searchQuery.toLowerCase()
          ) ||
          medicine.Brand.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  openDeleteModal(medicine: Medicine): void {
    this.medicineToDelete = medicine;
    const deleteModal: any = document.getElementById('deleteModal');
    deleteModal.style.display = 'block';
  }
  closeDeleteModal(): void {
    const deleteModal: any = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
  }
  confirmDelete(): void {
    this.deleteMedicine(this.medicineToDelete.MedicineId!);
  }
  deleteMedicine(id: number): void {
    this.service.deleteMedicine(id).subscribe(
      () => {
        this.viewMedicines();
        this.router.navigate(['/ownerview']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
