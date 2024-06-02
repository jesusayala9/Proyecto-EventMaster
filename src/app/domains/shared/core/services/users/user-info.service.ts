import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { environment } from './../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User | null> {
    const apiUrl = environment.apiUrl;
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<User>(`${apiUrl}/auth/me`, { headers });
  }
}
