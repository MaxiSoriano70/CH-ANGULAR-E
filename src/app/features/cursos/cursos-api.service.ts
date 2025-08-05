import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
