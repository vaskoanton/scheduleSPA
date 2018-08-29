import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt';

@Injectable()
export class AuthService {
  helper:JwtHelperService;
  constructor(){
    this.helper = new JwtHelperService();
  }

  setToken(token: string): void{
     localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  resetToken(): void{
    localStorage.removeItem('token');
  }
  
  decodeToken(): Jwt{
    var user = this.helper.decodeToken(this.getToken());

    var jwt = new Jwt();
    jwt.aud = user["aud"];
    jwt.exp = user["exp"];
    jwt.iss = user["iss"];
    jwt.login = user["login"];
    jwt.nbf = user["nbf"];
    jwt.role = user["role"];
    jwt.username = user["username"];

    return jwt;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return!this.helper.isTokenExpired(token);
  }
}