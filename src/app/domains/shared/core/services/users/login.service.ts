import { LoginUser } from './../../../models/loginUser.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { Token } from '../../../models/token.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenKey = 'access_token';
  private userIdKey = 'user_id'; // Clave para almacenar el ID del usuario

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: LoginUser): Observable<Token> {
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Token>('http://127.0.0.1:8000/auth/token', body.toString(), { headers }).pipe(
      tap((token: Token) => {
        localStorage.setItem(this.tokenKey, token.access_token);
        this.getCurrentUser().subscribe(); // Obtener y guardar el ID del usuario
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<User>('http://127.0.0.1:8000/auth/me', { headers }).pipe(
      tap((user: User) => {
        if (user && user.id) {
          localStorage.setItem(this.userIdKey, user.id.toString());
        }
      })
    );
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }
}
