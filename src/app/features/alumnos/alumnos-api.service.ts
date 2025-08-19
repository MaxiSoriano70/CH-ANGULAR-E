  import { Injectable } from '@angular/core';
  import { delay, Observable } from 'rxjs';
  import { Student } from '../../../shared/entities';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })

  export class AlumnosAPIService {
    baseUrl = "https://689986effed141b96b9fc358.mockapi.io/api/v1";

    constructor(private http: HttpClient) { }

    // El OBSERVABLE SON DATOS QUE ESTAN EN CAMINO
    addAlumno(student: Omit<Student, 'id'>): Observable<Student> {
      return this.http.post<Student>(`${this.baseUrl}/students`, student);
    }

    getAlumnos(): Observable<Student[]> {
      /* DUDA EL TIPO ENTIDAD O OBSERVABLE DEVUELVO? */
      return this.http.get<Student[]>(`${this.baseUrl}/students`);
    }

    updateAlumno(student: Student): Observable<Student> {
      return this.http.put<Student>(`${this.baseUrl}/students/${student.id}`, student);
    }


    deleteAlumno(student : Student): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/students/${student.id}`);
    }
  }

