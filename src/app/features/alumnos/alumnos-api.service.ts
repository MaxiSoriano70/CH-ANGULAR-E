import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/entities';

@Injectable({
  providedIn: 'root',
})

export class AlumnosAPIService {
  baseUrl = 'https://689986effed141b96b9fc358.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  // El OBSERVABLE SON DATOS QUE ESTAN EN CAMINO
  addAlumno(student: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, student);
  }

  getAlumnos(): Observable<User[]> {
    /* DUDA EL TIPO ENTIDAD O OBSERVABLE DEVUELVO? */
    return this.http.get<User[]>(`${this.baseUrl}/users?role=USER`);
  }

  updateAlumno(student: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${student.id}`, student);
  }

  deleteAlumno(student: User): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${student.id}`);
  }
}
