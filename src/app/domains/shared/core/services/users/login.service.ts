import { LoginUser } from './../../../models/loginUser.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { Token } from '../../../models/token.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenKey = 'access_token';
  private router: Router;

  constructor(private http: HttpClient,  router: Router) {
    this.router = router;
  }

  loginUser(user: LoginUser): Observable<Token> {
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Token>('http://127.0.0.1:8000/auth/token', body.toString(), { headers });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

}
