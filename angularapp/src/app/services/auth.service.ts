import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:8080'


  constructor(private http: HttpClient, private jwt: JwtService) { }
  
  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/register', user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/login', login)
      .pipe(map(user => {
        if (user && user.token) {
          this.jwt.saveToken(user.token);
        }
        return user;
      }));
  }

  logout(): Observable<void> {
    this.jwt.destroyToken();
    return of(undefined);
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
}
