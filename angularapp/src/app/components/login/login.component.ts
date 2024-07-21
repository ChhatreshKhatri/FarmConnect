import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports:[FormsModule,CommonModule,RouterModule]
})
export class LoginComponent implements OnInit {
  loginModel: Login = {
    Email: '',
    Password: '',
  };
  error!: string;
  isFormValid(): boolean {
    return !(this.loginModel.Email == '' || this.loginModel.Password == '');
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwt: JwtService
  ) {}
  login() {
    if (this.isFormValid()) {
      this.authService.login(this.loginModel).subscribe(
        (data: { error: string; token: any }) => {
          this.error = data.error;
          this.jwt.saveToken(data.token);
          this.router.navigate(['/']);
        },
        (error: { error: any }) => {
          this.error = error.error.message;
          console.log(error);
        }
      );
    }
  }
  ngOnInit(): void {
    this.authService.logout();
  }
}
