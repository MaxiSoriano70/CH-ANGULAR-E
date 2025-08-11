import { Component } from '@angular/core';
import { Student } from '../../../../shared/entities';
import { Router } from '@angular/router';
import { JsonPipe, Location } from '@angular/common';

@Component({
  selector: 'app-view-student',
  imports: [],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  student: Student | undefined;

  constructor(private router: Router, private location: Location){
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.["student"];
  }

  goBack(): void {
    this.location.back();
  }
}
