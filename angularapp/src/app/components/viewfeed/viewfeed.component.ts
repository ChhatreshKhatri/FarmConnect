import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

declare var $: any;

@Component({
  selector: 'app-viewfeed',
  templateUrl: './viewfeed.component.html',
  styleUrls: ['./viewfeed.component.css']
})
export class ViewfeedComponent implements OnInit {

  isModalOpen:boolean=false;

  
  constructor(private service:FeedService,private  router:Router) { }

  feedId:number;
  feeds: any;
  selectedImage: string;
  ngOnInit(): void {
    this.loadFeed();
  }
  viewImage(image: string) {
    this.selectedImage =  image;
  }
  
  loadFeed()
  {
    this.service.getAllFeed().subscribe(
      data=>{this.feeds= data;
      console.log(this.feeds)},
      err=> console.log(err)
    );
}

  delete(feedId:number){
    this.feedId=feedId
  }

  deleteconfirm(){
    this.service.deleteFeed(this.feedId).subscribe()
  }

}