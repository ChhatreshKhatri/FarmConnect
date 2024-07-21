import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
})
export class RegistrationComponent implements OnInit {
  registerModel: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: '',
  };
  error!: string;
  ConfirmPassword: string = '';
  touched: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  checkPass(): boolean {
    return this.touched && this.ConfirmPassword !== this.registerModel.Password;
  }
  onTouched() {
    this.touched = true;
  }
  isFormValid(): boolean {
    return !(
      this.registerModel.Email == '' ||
      this.registerModel.Password == '' ||
      this.registerModel.Username == '' ||
      this.registerModel.MobileNumber == '' ||
      this.registerModel.UserRole == '' ||
      this.checkPass()
    );
  }
  register() {
    if (this.isFormValid()) {
      this.authService.register(this.registerModel).subscribe({
        next: (data: any) => {
          console.log(data);
          this.error = data;
          this.router.navigate(['/login']);
        },
        error: (error: { error: any }) => {
          console.log(error);
          if (error && error.error) {
            this.error = error.error.message;
          } else {
            this.error = 'An error occurred';
          }
        },
        complete: () => {
          console.log('Registration completed.');
        }
      });
    }
  }
  

  ngOnInit(): void {}
}
