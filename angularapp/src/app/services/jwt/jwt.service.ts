import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwtToken!: string;
  decodedToken!: { [key: string]: string; };

  constructor(private cookieService: CookieService) { } // Inject CookieService

  saveToken(token: string): void {
    const expires = new Date(new Date().getTime() + 30 * 60000); // Set expiration to 30 minutes
    this.cookieService.set('jwtToken', token, expires, '/'); // Set cookie
  }

  getToken(): string | null {
    const token = this.cookieService.get('jwtToken');
    return token ? token : null;
  }

  destroyToken(): void {
    this.cookieService.delete('jwtToken', '/');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
