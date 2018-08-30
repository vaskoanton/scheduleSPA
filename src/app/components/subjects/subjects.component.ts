import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[]; 

  constructor(private subjectService: SubjectService) {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
   }

  ngOnInit() {

  }
}
