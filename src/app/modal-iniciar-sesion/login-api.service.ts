import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  baseUrl = 'https://689986effed141b96b9fc358.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map(users => users.length ? users[0] : null)
      );
  }
}
