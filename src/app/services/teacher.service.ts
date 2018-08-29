import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { Api } from '../constants/api';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private http: HttpClient) { }

  public getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(Api.endPoint + "teacher");
  }
}
