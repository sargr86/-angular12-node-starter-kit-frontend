import {Injectable} from '@angular/core';
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
  ) {
  }

  login(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/login`, params);
  }

  verifyCode(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/verify-code`, params);
  }

  sendVerificationCode(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/send-verification-code`, params);
  }

  sendForgotPassEmail(params: User) {
    return this.httpClient.post<User>(`${API_URL}auth/send-forgot-pass-email`, params);
  }

  resetPass(params: User) {
    return this.httpClient.post<any>(`${API_URL}auth/reset-password`, params);
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }


}
