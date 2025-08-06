import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../../shared/emtities';

@Injectable({
  providedIn: 'root'
})
export class CursosAPIService {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }
  /* El OBSERVABLE SON DATOS QUE ESTAB EN CAMINO*/
  getCursos(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  updateCurso(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/courses/${course.id}`, course).pipe(delay(1000));
  }

  deleteCurso(course : Course): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/courses/${course.id}`).pipe(delay(1000));
  }
}
