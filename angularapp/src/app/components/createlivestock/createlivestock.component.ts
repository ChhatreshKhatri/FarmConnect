import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livestock } from '../../models/livestock.model';
import { AuthService } from '../../services/auth.service';
import { LivestockService } from '../../services/livestock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-createlivestock',
  templateUrl: './createlivestock.component.html',
  styleUrls: ['./createlivestock.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CreatelivestockComponent implements OnInit {
  msg!: string;

  constructor(
    private service: LivestockService,
    private router: Router,
    private authserice: AuthService
  ) {}

  newLivestock: Livestock = {
    LivestockId: 0,
    Name: '',
    Species: '',
    Age: 0,
    Breed: '',
    HealthCondition: '',
    Location: '',
    VaccinationStatus: '',
    UserId: 0,
  };

  formSubmitted = false;
  isModalOpen = false;
  ngOnInit(): void {
    this.authserice.getUserId().subscribe(
      (data) => {
        console.log(data);
        this.newLivestock.UserId = parseInt(data);
      },
      (error) => console.log(error)
    );
  }
  addLivestock() {
    this.formSubmitted = true;
    console.log(this.isFormValid());
    if (this.isFormValid()) {
      this.service.addLivestock(this.newLivestock).subscribe({
        next: (data) => {
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        error: (error) => {
          this.msg = error.error;
          console.log(error);
        },
        complete: () => {
          console.log('Livestock addition completed.');
        },
      });
    }
  }

  isFieldInvalid(control: string): boolean {
    return this.newLivestock[control] == '';
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

  closeModal() {
    this.isModalOpen = false;
    $('#successModal').modal('hide');
    this.router.navigate(['/viewlivestock']);
  }
}
