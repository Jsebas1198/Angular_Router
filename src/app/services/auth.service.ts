import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {  HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

// import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './token.service';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = `${environment.API_URL}/api/auth`;

  private apiUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  // getProfile(token: string) {
  getProfile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers, => Una manera de hacerlo
      //El interceptor token se encarga de poner los tokens en cada petición si el usuario tiene uno
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // 'Content-type': 'application/json'
      // },
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.getProfile())
    );
  }
}
