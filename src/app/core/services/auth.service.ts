import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
}
