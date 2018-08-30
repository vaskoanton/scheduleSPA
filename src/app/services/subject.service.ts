import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable } from 'rxjs';
import { Api } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  
  public getSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(Api.endPoint + "subject");
  }
}
