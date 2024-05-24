import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../../../../models/event.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEventsService {
  private http = inject(HttpClient);
  private tokenKey = 'access_token';
  private userIdKey = 'user_id';

  constructor() {}

  getEventsByUser(): Observable<Event[]> {
    const token = localStorage.getItem(this.tokenKey);
    const userId = localStorage.getItem(this.userIdKey);

    if (!token || !userId) {
      return of([]); // Devuelve un Observable vacío si el usuario no está autenticado
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Event[]>(`http://127.0.0.1:8000/users/${userId}/events`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user events', error);
        return of([]); // Devuelve un Observable vacío en caso de error
      })
    );
  }
}
