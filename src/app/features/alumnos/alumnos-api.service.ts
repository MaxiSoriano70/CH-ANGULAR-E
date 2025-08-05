import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../../shared/emtities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPIService {
  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }
  /* El OBSERVABLE SON DATOS QUE ESTAB EN CAMINO*/
  getAlumnos(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }
}
