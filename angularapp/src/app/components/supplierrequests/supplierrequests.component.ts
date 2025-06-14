import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LivestockService } from '../../services/livestock.service';
import { Livestock } from '../../models/livestock.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplierrequests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './supplierrequests.component.html',
  styleUrls: ['./supplierrequests.component.css']
})
export class SupplierrequestsComponent implements OnInit {
  livestockRequests: Livestock[] = [];
  requests: Livestock[] = [];
  selectedLivestock: Livestock = {
    LivestockId: 0,
    Name: '',
    Species: '',
    Breed: '',
    Age: 0,
    Weight: 0,
    HealthStatus: '',
    OwnerId: 0,
    RequestType: '',
    Status: '',
    Location: '',
    UserId: 0
  };
  isModalOpen: boolean = false;
  searchQuery: string = '';

  constructor(private livestockService: LivestockService) { }

  ngOnInit(): void {
    this.loadLivestockRequests();
  }

  loadLivestockRequests(): void {
    this.livestockService.getLivestockRequests().subscribe({
      next: (data: Livestock[]) => {
        this.livestockRequests = data;
        this.requests = data;
      },
      error: (error: any) => {
        console.error('Error loading livestock requests:', error);
      }
    });
  }

  filterRequests(): void {
    const query = this.searchQuery.toLowerCase();
    this.requests = this.livestockRequests.filter(l =>
      l.Name?.toLowerCase().includes(query) ||
      l.Species?.toLowerCase().includes(query) ||
      l.Breed?.toLowerCase().includes(query)
    );
  }

  details(livestock: Livestock): void {
    this.selectedLivestock = livestock;
    this.isModalOpen = true;
  }

  approve(id: number): void {
    this.livestockService.approveRequest(id).subscribe({
      next: () => this.loadLivestockRequests(),
      error: (error: any) => console.error('Error approving request:', error)
    });
  }

  reject(id: number): void {
    this.livestockService.rejectRequest(id).subscribe({
      next: () => this.loadLivestockRequests(),
      error: (error: any) => console.error('Error rejecting request:', error)
    });
  }
}
