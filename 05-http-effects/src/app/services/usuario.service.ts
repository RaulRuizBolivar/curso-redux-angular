import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url :string = 'https://reqres.in/api'

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<ApiResponse>(`${this.url}/users?per_page=12`).pipe(
      map((response:ApiResponse)  => response.data)
    );
  }
}