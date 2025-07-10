import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { Feed } from '../../models/feed.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-viewfeed',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './viewfeed.component.html',
    styleUrls: ['./viewfeed.component.css']
})
export class ViewfeedComponent implements OnInit {
    feeds: Feed[] = [];
    feedId: number = 0;
    selectedImage: string = '';
    isModalOpen: boolean = false;
    feedIdToDelete: number = 0;

    constructor(private feedService: FeedService, private router: Router) { }

    ngOnInit(): void {
        this.loadFeeds();
    }

    loadFeeds(): void {
        this.feedService.getFeeds().subscribe({
            next: (data: Feed[]) => {
                this.feeds = data;
            },
            error: (error: any) => {
                console.error('Error loading feeds:', error);
            }
        });
    }

    onEdit(feedId: number): void {
        this.router.navigate(['/suppliereditfeed', feedId]);
    }

    onDelete(feedId: number): void {
        this.feedIdToDelete = feedId;
    }

    confirmDelete(): void {
        if (this.feedIdToDelete) {
            this.feedService.deleteFeed(this.feedIdToDelete).subscribe({
                next: () => {
                    this.loadFeeds();
                    this.isModalOpen = false;
                },
                error: (error: any) => {
                    console.error('Error deleting feed:', error);
                }
            });
        }
    }

    viewImage(image: string): void {
        this.selectedImage = image;
    }
}