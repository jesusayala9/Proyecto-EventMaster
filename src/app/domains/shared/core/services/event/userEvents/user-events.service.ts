import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../../../../models/event.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEventsService {

  private tokenKey = 'access_token';
  private userIdKey = 'user_id';

  constructor(private http: HttpClient) {}

  getEventsByUser(): Observable<Event[]> {
    const token = localStorage.getItem(this.tokenKey);
    const userId = localStorage.getItem(this.userIdKey);

    if (!token || !userId) {
      return of([]); // Devuelve un Observable vacío si el usuario no está autenticado
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<Event[]>(`http://127.0.0.1:8000/users/${userId}/events`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user events', error);
          return of([]); // Devuelve un Observable vacío en caso de error
        })
      );
  }

  deleteEvent(userId: string, eventId: number): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);

    if (!token || !userId) {
      return of(null); // Devuelve un Observable vacío si el usuario no está autenticado
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(`http://127.0.0.1:8000/users/${userId}/events/${eventId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting event', error);
          return of(null); // Devuelve un Observable vacío en caso de error
        })
      );
  }

  addUserToEvent(userId: string, eventId: number): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);

    if (!token || !userId) {
      return of(null); // Devuelve un Observable vacío si el usuario no está autenticado
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put(
        `http://127.0.0.1:8000/users/${userId}/event/${eventId}`,
        {}, // Cuerpo de la solicitud vacío, ya que estás pasando los datos en la URL
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error adding user to event', error);
          return of({ message: 'Error adding user to event' }); // Devuelve un Observable con el error
        })
      );
  }
}
