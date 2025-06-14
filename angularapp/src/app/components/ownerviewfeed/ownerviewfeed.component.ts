import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ownerviewfeed',
    templateUrl: './ownerviewfeed.component.html',
    styleUrls: ['./ownerviewfeed.component.css'],
    standalone: true,
    imports: [FormsModule, RouterModule]
})
export class OwnerviewfeedComponent implements OnInit {

  requestString: string = 'Feed';
  feeds: Feed[] = [];
  masterFeed: Feed[] = [];
  searchQuery: string = '';

  constructor(private service: FeedService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed() {
    this.service.getAllFeed().subscribe({
      next: (data: Feed[]) => {
        this.feeds = data;
        this.filterFeed();
      },
      error: (err: any) => console.log(err)
    });
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
