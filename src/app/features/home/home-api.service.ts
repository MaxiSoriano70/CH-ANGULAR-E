import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../shared/entities';

@Injectable({
  providedIn: 'root'
})

export class HomeApiService {

  baseUrl = "https://689986effed141b96b9fc358.mockapi.io/api/v1";

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }
}
