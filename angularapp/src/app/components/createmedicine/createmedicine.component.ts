import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-createmedicine',
  templateUrl: './createmedicine.component.html',
  styleUrls: ['./createmedicine.component.css']
})
export class CreatemedicineComponent implements OnInit {

  constructor(private medService: MedicineService, private router: Router, private authService: AuthService) { }
  newMedicine: Medicine = {
    MedicineName: '',
    Brand: '',
    Category: '',
    Description: '',
    Quantity: 0,
    Unit: '',
    PricePerUnit: 0,
    Image: '',
    UserId: 0
  }
  formSubmitted = false;
  isModalOpen = false;
  ngOnInit(): void {
    this.authService.getUserId().subscribe(
      data => { console.log(data); this.newMedicine.UserId = parseInt(data) },
      error => console.log(error)
    );

  }

  addMedicine() {
    this.formSubmitted = true;
    console.log(this.isFormValid());
    if (this.isFormValid()) {
      this.medService.addMedicine(this.newMedicine).subscribe(
        data => {
          this.newMedicine = data;
          console.log(data);
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        error => console.log(error)
      );

    }
    // this.isModalOpen = true;
    // $('#successModal').modal('show');
  }

  isFieldInvalid(control: string): boolean {
    return (this.newMedicine[control].toString() == '' && (this.newMedicine[control].touched || this.formSubmitted));
  }

  isFormValid(): boolean {
    return !(this.isFieldInvalid('MedicineName') || this.isFieldInvalid('Brand') || this.isFieldInvalid('Category') || this.isFieldInvalid('Description') || this.isFieldInvalid('Quantity') || this.isFieldInvalid('Unit') || this.isFieldInvalid('PricePerUnit') || this.isFieldInvalid('Image') || this.isFieldInvalid('UserId'));

  }
  closeModal() {
    this.isModalOpen = false;
    $('#successModal').modal('hide');
    this.router.navigate(['/viewmedicine']);
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newMedicine.Image = reader.result as string;
      // console.log(this.newMedicine.Image)
    };
  }
}
