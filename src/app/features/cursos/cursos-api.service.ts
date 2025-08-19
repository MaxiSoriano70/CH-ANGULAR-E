import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CursosAPIService {
  baseUrl = "https://689986effed141b96b9fc358.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }
  /* El OBSERVABLE SON DATOS QUE ESTAB EN CAMINO*/
  addCurso(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/courses`, course);
  }

  getCursos(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  updateCurso(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/courses/${course.id}`, course);
  }

  deleteCurso(course : Course): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/courses/${course.id}`);
  }
}
