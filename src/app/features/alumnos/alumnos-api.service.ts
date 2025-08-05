import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../../shared/emtities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlumnosAPIService {
  baseUrl = "http://localhost:3000";
  // El OBSERVABLE SON DATOS QUE ESTAN EN CAMINO
  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`).pipe(delay(1000));
  }
  constructor(private http: HttpClient) { }
}

