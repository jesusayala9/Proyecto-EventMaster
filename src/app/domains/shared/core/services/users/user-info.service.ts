import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<User>('http://127.0.0.1:8000/auth/me', { headers });
  }
}
