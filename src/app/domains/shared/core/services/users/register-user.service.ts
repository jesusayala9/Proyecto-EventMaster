import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterUser } from '../../../models/registerUser.models';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private http = inject(HttpClient);

  constructor() {}

  postUser(user: RegisterUser): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:8000/auth/register', user);
  }
}
