import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt/jwt.service';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api`;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient, 
    private jwt: JwtService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, login)
      .pipe(map(user => {
        if (user && user.token && this.isBrowser) {
          localStorage.setItem('token', user.token);
          return user;
        }
        return null;
      }));
  }

  logout(): Observable<void> {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    return of(void 0);
  }
  

  isOwner(): Observable<boolean> {
    let token = this.jwt.getToken();
    if (typeof token === 'string'&& token.length > 0) {
      const tokenSplit = token.split('.');
      const payload = JSON.parse(atob(tokenSplit[1]));
      return of(payload.role === 'Owner');
    }
    return of(false);
  }

  isSupplier(): Observable<boolean> {
    let token = this.jwt.getToken();
    if (typeof token === 'string'&& token.length > 0) {
      const tokenSplit = token.split('.');
      const payload = JSON.parse(atob(tokenSplit[1]));
      return of(payload.role === 'Supplier');
    }
    return of(false);
  }

  getUserId(): Observable<string> {
    let token = this.jwt.getToken();
    if (typeof token === 'string'&& token.length > 0) {
      const tokenSplit = token.split('.');
      const payload = JSON.parse(atob(tokenSplit[1]));
      return of(payload.userId ? payload.userId : "not found");
    }
    return of();
  }

  getUserName(): Observable<string> {
    let token = this.jwt.getToken();
    if (typeof token === 'string'&& token.length > 0) {
      const tokenSplit = token.split('.');
      const payload = JSON.parse(atob(tokenSplit[1]));
      return of(payload.name ? payload.name : "not found");
    }
    return of();
  }

  getRole(): Observable<string> {
    let token = this.jwt.getToken();
    if (typeof token === 'string'&& token.length > 0) {
      const tokenSplit = token.split('.');
        const payload = JSON.parse(atob(tokenSplit[1]));
        return of(payload.role ? payload.role : "not found");
    }
    return of();
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.jwt.isLoggedIn());
  }

  getCurrentUserId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/current-user`);
  }

  isAuthenticated(): boolean {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }
}
