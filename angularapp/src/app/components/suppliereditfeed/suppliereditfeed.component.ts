import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-suppliereditfeed',
    templateUrl: './suppliereditfeed.component.html',
    styleUrls: ['./suppliereditfeed.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class SuppliereditfeedComponent implements OnInit {

  id: number = 0;
  feed: Feed = {
    FeedName: '',
    Type: '',
    Description: '',
    Quantity: 0,
    Unit: '',
    PricePerUnit: 0,
    Image: '',
    UserId: 0
  };
  // extFeed1: Feed = { FeedId: 0, FeedName: '', Type: '', Description: '', Quantity: 0, Unit: '', PricePerUnit: 0.0, Image: '', UserId: 0 };
  message: string = '';

  constructor(private service: FeedService, private router: Router, private route: ActivatedRoute) { }

  formSubmitted: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.service.getFeedById(this.id).subscribe(
          (data: Feed) => {
            this.feed = data;
            console.log(this.feed)
            // this.extFeed1 = data
          },
          (error: any) => console.log(error)
        );
      }
    );
      

  }
  updateFeed() {
    this.service.updateFeed(this.feed).subscribe({
      next: (data: Feed) => {
        console.log(data);
        this.router.navigate(['/viewfeed']);
      },
      error: (err: any) => {
        console.log(err);
        this.message = 'Error updating feed';
      }
    });
  }

  isFieldInvalid(control: keyof Feed): boolean {
    const value = this.feed[control];
    if (value === '' && (this.formSubmitted)) {
      return true;
    }
    return false;
  }

  isFormValid(): boolean {
    return !(
      this.isFieldInvalid('FeedName') ||
      this.isFieldInvalid('Type') ||
      this.isFieldInvalid('Description') ||
      this.isFieldInvalid('Quantity') ||
      this.isFieldInvalid('Unit') ||
      this.isFieldInvalid('PricePerUnit') ||
      this.isFieldInvalid('Image')
    );
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.feed.Image = reader.result as string;
        // console.log(this.medicine.Image)
      };
    }
  }

}
