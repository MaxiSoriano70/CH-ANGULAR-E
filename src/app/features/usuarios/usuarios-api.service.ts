import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../shared/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosApiService {

  baseUrl = 'https://689986effed141b96b9fc358.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  // El OBSERVABLE SON DATOS QUE ESTAN EN CAMINO
  addUsuario(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  getUsuarios(): Observable<User[]> {
    /* DUDA EL TIPO ENTIDAD O OBSERVABLE DEVUELVO? */
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  updateUsuario(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.id}`, user);
  }

  deleteUsuario(user: User): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${user.id}`);
  }
}
