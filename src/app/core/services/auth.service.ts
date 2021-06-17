import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/global';
import {User} from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  login(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/login`, params);
  }

  register(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/register`, params);
  }

  sendVerificationCode(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/send-verification-code`, params);
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
}
