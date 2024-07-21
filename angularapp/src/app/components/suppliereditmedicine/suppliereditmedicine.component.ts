import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';
declare var $: any;
@Component({
  selector: 'app-suppliereditmedicine',
  templateUrl: './suppliereditmedicine.component.html',
  styleUrls: ['./suppliereditmedicine.component.css']
})
export class SuppliereditmedicineComponent implements OnInit {
  id: number;
  message: string;
  isModalOpen:boolean=false;
  medicine: Medicine = {
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
  medicine1: Medicine = {
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
  formSubmitted: false;

  constructor(private service: MedicineService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params.id)
        this.id = params.id
        this.service.getMedicineById(this.id).subscribe(
          data => {
            this.medicine = data;
            this.medicine1 = {...data};
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.medicine.Image = reader.result as string;
      console.log(this.medicine.Image)
    };
  }

  medicinesAreEqual(medicine1: Medicine, medicine2: Medicine): boolean {
    return JSON.stringify(medicine1) === JSON.stringify(medicine2);
  }


  updateMedicine() {
    console.log(this.medicine)
    console.log(this.medicine1)
    if (this.medicinesAreEqual(this.medicine, this.medicine1)) {
      console.log('medicine exists')
      this.message = "medicine exists";
      return;
    }
    else {
      this.service.updateMedicine(this.id, this.medicine).subscribe(
        data => {
          this.isModalOpen=true;
          console.log(data)
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        error => console.log(error)
      );
    }
  }
  isFieldInvalid(control: string): boolean {
    if (this.medicine[control] == '' && (this.medicine[control].touched || this.formSubmitted)) {
      return true;
    }
    else {
      return false;
    }
  }
  clickOk(){
    this.router.navigate(['/viewmedicine'])

  }
  isFormValid(): boolean {
    if (this.isFieldInvalid('MedicineName') || this.isFieldInvalid('Brand') || this.isFieldInvalid('Category') || this.isFieldInvalid('Description') || this.isFieldInvalid('Quantity') || this.isFieldInvalid('Unit') || this.isFieldInvalid('PricePerUnit') || this.isFieldInvalid('Image') || this.isFieldInvalid('UserId'))
      return false;
    else
      return true;
  }
}
