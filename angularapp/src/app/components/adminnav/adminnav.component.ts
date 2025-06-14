import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AdminnavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
