import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPerfilService {

  baseUrl = 'https://689986effed141b96b9fc358.mockapi.io/api/v1';

  constructor(private http: HttpClient) { }

  updatePerfil(user: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }
}
