import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { Routes } from '../../constants/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent{

  teachers: Teacher[];
  routes:any;

  constructor(private teacherService: TeacherService, private router: Router) { 
    this.routes = Routes;
    this.loadTeachers();
  }

  loadTeachers():void{
    this.teacherService.getTeachers().subscribe(teachers => { 
      this.teachers = teachers;
    });
  }
}


