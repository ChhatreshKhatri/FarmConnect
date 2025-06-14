import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Livestock } from '../../models/livestock.model';
import { AuthService } from '../../services/auth.service';
import { LivestockService } from '../../services/livestock.service';


declare var $: any;
@Component({
    selector: 'app-viewlivestock',
    templateUrl: './viewlivestock.component.html',
    styleUrls: ['./viewlivestock.component.css'],
    standalone: true,
    imports: [RouterModule]
})
export class ViewlivestockComponent implements OnInit {
  isModalOpen: boolean = false;
  UserId!: number;
  livestocks!: Livestock[];
  deleteId!: number;
  deleteText!: string;
  msg!: string;
  constructor(
    private service: LivestockService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.authservice.getUserId().subscribe({
      next: (data) => {
        this.UserId = +data;
        this.LoadLivestock();
      },
      error: (error) => console.log(error),
      complete: () => {
        // console.log('completed');
      },
    });
  }
  LoadLivestock() {
    this.service.getLivestockByUserID(this.UserId).subscribe({
      next: (data) => {
        this.livestocks = data;
        console.log(data);
      },
      error: (err) => {
        this.msg = err.error.message;
        console.log(err);
      },
      complete: () => {
        // console.log('completed');
      },
    });
  }
  onDelete(id: number) {
    this.isModalOpen = true;
    this.deleteId = id;
    $('#deleteModal').modal('show');
  }
  Delete(id: number) {
    this.service.deleteLivestock(id).subscribe(
      (data) => {
        this.isModalOpen = false;
        $('#deleteModal').modal('hide');
        this.LoadLivestock();
      },
      (error) => {
        console.log(error);
        this.deleteText = error.error;
        // this.isModalOpen = false;
        // $('#deleteModal').modal('hide');
      }
    );
  }
  Cancel() {
    this.isModalOpen = false;
  }
}
