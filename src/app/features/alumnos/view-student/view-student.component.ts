import { Component } from '@angular/core';
import { Student } from '../../../../shared/emtities';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-student',
  imports: [JsonPipe],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  student: Student | undefined;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.["student"];
  }
}
