import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feed } from '../../models/feed.model';
import { AuthService } from '../../services/auth.service';
import { FeedService } from '../../services/feed.service';

declare var $: any;

@Component({
    selector: 'app-createfeed',
    templateUrl: './createfeed.component.html',
    styleUrls: ['./createfeed.component.css'],
    standalone: false
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
    UserId: 0,
  };
  // newFeed1:Feed={FeedId:0,FeedName:'',Type:'',Description:'',Quantity:0,Unit:'',PricePerUnit:0,Image:'',UserId:0};

  constructor(
    private service: FeedService,
    private router: Router,
    private authservice: AuthService
  ) {}

  formSubmitted = false;
  isModalOpen = false;

  ngOnInit(): void {
    this.authservice.getUserId().subscribe(
      (data) => {
        console.log(data);
        this.newFeed.UserId = parseInt(data);
      },
      (error) => console.log(error)
    );
  }
  addFeed() {
    this.formSubmitted = true;
    if (this.isFormValid()) {
      this.service.addFeed(this.newFeed).subscribe(
        (data) => {
          this.newFeed = data;
          console.log(data);
          // this.router.navigate(['/viewfeed']);
          this.isModalOpen = true;
          $('#successModal').modal('show');
        },
        (err) => console.log(err)
      );
    }
  }

  isFieldInvalid(control: keyof Feed): boolean {
    // Now 'control' can only be a key of 'Feed'
    return (this.newFeed[control] === '' && ( this.formSubmitted));
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
      this.isFieldInvalid('UserId')
    );
  }

  closeModal() {
    this.isModalOpen = false;
    $('#successModal').modal('hide');
    this.router.navigate(['/viewfeed']);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newFeed.Image = reader.result as string;
      // console.log(this.newFeed.Image)
    };
  }
}
