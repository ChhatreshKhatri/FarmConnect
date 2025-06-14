import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-createmedicine',
  templateUrl: './createmedicine.component.html',
  styleUrls: ['./createmedicine.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class CreatemedicineComponent implements OnInit {
  constructor(
    private medService: MedicineService,
    private router: Router,
    private authService: AuthService
  ) {}

  newMedicine: Medicine = {
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
  formSubmitted = false;
  isModalOpen = false;

  ngOnInit(): void {
    this.authService.getUserId().subscribe({
      next: (data: string) => {
        console.log(data);
        this.newMedicine.UserId = parseInt(data);
      },
      error: (error: any) => console.log(error)
    });
  }

  addMedicine() {
    this.formSubmitted = true;
    console.log(this.isFormValid());
    if (this.isFormValid()) {
      this.medService.addMedicine(this.newMedicine).subscribe({
        next: (data: Medicine) => {
          this.newMedicine = data;
          console.log(data);
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        error: (error: any) => console.log(error)
      });
    }
  }

  isFieldInvalid(control: keyof Medicine): boolean {
    const value = this.newMedicine[control];
    return (value === '' || value === 0) && this.formSubmitted;
  }

  isFormValid(): boolean {
    return !(
      this.isFieldInvalid('MedicineName') ||
      this.isFieldInvalid('Brand') ||
      this.isFieldInvalid('Category') ||
      this.isFieldInvalid('Description') ||
      this.isFieldInvalid('Quantity') ||
      this.isFieldInvalid('Unit') ||
      this.isFieldInvalid('PricePerUnit') ||
      this.isFieldInvalid('Image') ||
      this.isFieldInvalid('UserId')
    );
  }

  closeModal() {
    this.isModalOpen = false;
    $('#successModal').modal('hide');
    this.router.navigate(['/viewmedicine']);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newMedicine.Image = reader.result as string;
      };
    }
  }
}
