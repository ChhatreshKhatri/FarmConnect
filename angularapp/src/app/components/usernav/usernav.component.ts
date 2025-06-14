import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class UsernavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
