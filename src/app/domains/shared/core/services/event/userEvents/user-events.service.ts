import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../../../../models/event.model';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class UserEventsService {
  private apiUrl = environment.apiUrl;
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
      .get<Event[]>(`${this.apiUrl}/users/${userId}/events`, { headers })
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
      .delete(`${this.apiUrl}/users/${userId}/events/${eventId}`, {
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
        `${this.apiUrl}/users/${userId}/event/${eventId}`,
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

  getUserCreatedEvents(userId: string): Observable<Event[]> {
    const token = localStorage.getItem(this.tokenKey);

    if (!token || !userId) {
      return of([]); // Devuelve un Observable vacío si el usuario no está autenticado o no se proporciona un userId válido
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get<Event[]>(`${this.apiUrl}/users/${userId}/created-events`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user created events', error);
          return of([]); // Devuelve un Observable vacío en caso de error
        })
      );
  }
}
