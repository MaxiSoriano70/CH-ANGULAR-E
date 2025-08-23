import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../../shared/entities';

@Component({
  selector: 'app-view-student',
  imports: [],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})

export class ViewStudentComponent {
  student: User | undefined;

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.["student"];
  }

  goBack(): void {
    this.location.back();
  }
}
