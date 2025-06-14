import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feed } from '../../models/feed.model';
import { AuthService } from '../../services/auth.service';
import { FeedService } from '../../services/feed.service';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-createfeed',
    templateUrl: './createfeed.component.html',
    styleUrls: ['./createfeed.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class CreatefeedComponent implements OnInit {
  newFeed: Feed = {
    FeedId: 0,
    FeedName: '',
    Type: '',
    Description: '',
    Quantity: 0,
    Unit: '',
    PricePerUnit: 0,
    Image: '',
    Brand: '',
    Category: ''
  };

  constructor(
    private service: FeedService,
    private router: Router,
    private authservice: AuthService
  ) {}

  formSubmitted = false;
  isModalOpen = false;
  userId: number = 0;

  ngOnInit(): void {
    this.authservice.getUserId().subscribe({
      next: (data: string) => {
        console.log(data);
        this.userId = parseInt(data);
      },
      error: (error: any) => console.log(error)
    });
  }

  addFeed() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.service.addFeed(this.newFeed).subscribe({
        next: (data: Feed) => {
          this.newFeed = data;
          console.log(data);
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        error: (error: any) => console.log(error)
      });
    }
  }

  isFieldInvalid(control: keyof Feed): boolean {
    const value = this.newFeed[control];
    return (value === '' || value === 0) && this.formSubmitted;
  }

  isFormValid(): boolean {
    return !(
      this.isFieldInvalid('FeedName') ||
      this.isFieldInvalid('Type') ||
      this.isFieldInvalid('Description') ||
      this.isFieldInvalid('Quantity') ||
      this.isFieldInvalid('Unit') ||
      this.isFieldInvalid('PricePerUnit') ||
      this.isFieldInvalid('Image') ||
      this.isFieldInvalid('Brand') ||
      this.isFieldInvalid('Category')
    );
  }

  closeModal() {
    this.isModalOpen = false;
    $('#successModal').modal('hide');
    this.router.navigate(['/viewfeed']);
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newFeed.Image = reader.result as string;
      };
    }
  }
}
