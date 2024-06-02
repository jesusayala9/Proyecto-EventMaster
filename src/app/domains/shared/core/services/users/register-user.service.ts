import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterUser } from '../../../models/registerUser.models';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { environment } from './../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private http = inject(HttpClient);

  constructor() {}

  postUser(user: RegisterUser): Observable<User> {
    const apiUrl = environment.apiUrl;
    return this.http.post<User>(`${apiUrl}/auth/register`, user);
  }
}
