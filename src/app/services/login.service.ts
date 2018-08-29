import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Token } from '../models/token';
import { Observable } from "rxjs";
import { Api } from '../constants/api';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient){
    
  }

  public authorize(data: User): Observable<Token>{
    return this.http.post<Token>(Api.endPoint + "user/token", data);
  }
}
