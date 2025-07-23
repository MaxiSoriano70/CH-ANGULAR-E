import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/emtities';
import { CommonModule } from '@angular/common';
import { StudentsTableComponent } from './students-table/students-table.component';
import { NuestrosSponsorsComponent } from './nuestros-sponsors/nuestros-sponsors.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, NuestrosSponsorsComponent, ToolbarComponent, StudentsTableComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-entrega-1';
  students: Student[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Student[]>('assets/mocks/students.json').subscribe(data => {
      this.students = data;
    });
  }

  onStudentAdded(student: Student) {
    console.log('Recibido en AppComponent:', student);
    this.students = [...this.students, student];
  }
}