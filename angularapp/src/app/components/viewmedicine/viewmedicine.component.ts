import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';

declare var $: any;

@Component({
    selector: 'app-viewmedicine',
    templateUrl: './viewmedicine.component.html',
    styleUrls: ['./viewmedicine.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule]
})
export class ViewmedicineComponent implements OnInit {
  isModalOpen = false;
  searchQuery = '';
  medicinesMaster: Medicine[] = [];
  medicines: Medicine[] = [];
  selectedImage = '';
  deleteId = 0;
  deleteText = '';

  constructor(
    private medService: MedicineService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadMedicine();
  }

  viewImage(image: string): void {
    this.selectedImage = image;
  }

  loadMedicine(): void {
    this.medService.getAllMedicine().subscribe({
      next: (data: Medicine[]) => {
        this.medicinesMaster = data;
        this.filterMedicines();
      },
      error: (error: any) => {
        console.error('Error loading medicines:', error);
      }
    });
  }

  filterMedicines(): void {
    if (!this.searchQuery) {
      this.medicines = this.medicinesMaster;
    } else {
      this.medicines = this.medicinesMaster.filter(medicine =>
        medicine.MedicineName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        medicine.Brand.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      this.isModalOpen = true;
      this.deleteId = id;
    }
  }

  Delete(id: number): void {
    if (id) {
      this.medService.deleteMedicine(id).subscribe({
        next: () => {
          this.loadMedicine();
          this.isModalOpen = false;
        },
        error: (error: any) => {
          console.error('Error deleting medicine:', error);
          this.deleteText = error.error;
        }
      });
    }
  }

  Cancel(): void {
    this.isModalOpen = false;
  }
}


