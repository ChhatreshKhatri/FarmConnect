import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
    selector: 'app-suppliereditfeed',
    templateUrl: './suppliereditfeed.component.html',
    styleUrls: ['./suppliereditfeed.component.css'],
    standalone: false
})
export class SuppliereditfeedComponent implements OnInit {

  id: number;
  extFeed: Feed = { FeedId: 0, FeedName: '', Type: '', Description: '', Quantity: 0, Unit: '', PricePerUnit: 0, Image: '', UserId: 0 };
  // extFeed1: Feed = { FeedId: 0, FeedName: '', Type: '', Description: '', Quantity: 0, Unit: '', PricePerUnit: 0.0, Image: '', UserId: 0 };
  message: string;

  constructor(private service: FeedService, private router: Router, private route: ActivatedRoute) { }

  formSubmitted = false;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
        this.service.getFeedById(this.id).subscribe(
          data => {
            this.extFeed = data;
            console.log(this.extFeed)
            // this.extFeed1 = data
          },
        )
      },
      error=>console.log(error)
    );
      

  }
  updateFeed() {
      this.service.updateFeed(this.id, this.extFeed).subscribe(
        data => {
          console.log(this.extFeed)
        },
        err => console.log(err)
      );
      this.router.navigate(['/viewfeed']);
  }

  isFieldInvalid(control: string): boolean {
    if (this.extFeed[control] == '' && (this.extFeed[control].touched || this.formSubmitted)) {
      return true;
    }
    else {
      return false;
    }
  }

  isFormValid(): boolean {
    if (this.isFieldInvalid('FeedName') || this.isFieldInvalid('Type') || this.isFieldInvalid('Description') || this.isFieldInvalid('Quantity') || this.isFieldInvalid('Unit') || this.isFieldInvalid('PricePerUnit') || this.isFieldInvalid('Image'))
      return false;
    else
      return true;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.extFeed.Image = reader.result as string;
      // console.log(this.medicine.Image)
    };
  }

}
