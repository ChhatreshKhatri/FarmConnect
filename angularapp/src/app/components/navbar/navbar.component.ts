import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AdminnavComponent } from '../adminnav/adminnav.component';
import { UsernavComponent } from '../usernav/usernav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminnavComponent, UsernavComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name$!: Observable<string>;
  role$!: Observable<string>;
  isAdmin$!: Observable<boolean>;
  isUser$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavbar();
      });
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.updateNavbar();
        this.router.navigate(['/login']);
      },
    });
  }
  updateNavbar(): void {
    this.name$ = this.authService.getUserName();
    this.role$ = this.authService.getRole();
    this.isAdmin$ = this.authService.isSupplier();
    this.isUser$ = this.authService.isOwner();
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
