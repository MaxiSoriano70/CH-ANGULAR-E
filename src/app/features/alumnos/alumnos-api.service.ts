import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../../shared/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlumnosAPIService {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  // El OBSERVABLE SON DATOS QUE ESTAN EN CAMINO
  addAlumno(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student).pipe(delay(1000));
  }

  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`).pipe(delay(1000));
  }

  updateAlumno(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/students/${student.id}`, student).pipe(delay(1000));
  }


  deleteAlumno(student : Student): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/students/${student.id}`).pipe(delay(1000));
  }
}

