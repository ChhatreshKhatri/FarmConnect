import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-ownerviewfeed',
  templateUrl: './ownerviewfeed.component.html',
  styleUrls: ['./ownerviewfeed.component.css']
})
export class OwnerviewfeedComponent implements OnInit {

  requestString:string='Feed';
  feeds:Feed[];
  masterFeed:Feed[];
  searchQuery:string;

  constructor(private  service:FeedService, private  router:Router) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed()
  {
    this.service.getAllFeed().subscribe(
      data=>{this.feeds=data;
      //  console.log(data)
      this.filterFeed(); 
      },
      err=>console.log(err)
    );
  }

  filterFeed() {
    if (!this.searchQuery) {
      this.masterFeed = this.feeds;
    } else {
      this.masterFeed = this.feeds.filter(feed =>
        feed.FeedName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        feed.Type.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  
}
