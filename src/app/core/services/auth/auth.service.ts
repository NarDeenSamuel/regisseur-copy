import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // private baseUrl = 'https://localhost:7041/api';
private baseUrl ='https://regisseur-app.runasp.net/api';
  signUp(data: any) {

    return this.http.post(
      `${this.baseUrl}/users/register`,
      data
    );

  }

  verifyOtp(data: any) {

    return this.http.post(
      `${this.baseUrl}/users/verify-otp`,
      data
    );

  }

  resendOtp(email: string) {

    return this.http.post(
      `${this.baseUrl}/users/resend-otp`,
      {
        email
      }
    );

  }

login(data: any) {

  return this.http.post(
    `${this.baseUrl}/users/login`,
    data
  );

}

  logout() {

    localStorage.removeItem('currentUser');

  }

  getCurrentUser() {

    return JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'currentUser'
    );

  }

}
