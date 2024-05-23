import { Injectable, inject } from '@angular/core';
import { RegisterEvent } from '../../../../models/registerEvent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateEventService {
  constructor(private http: HttpClient) {}

  postEvent(event: RegisterEvent): Observable<Event> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<Event>('http://127.0.0.1:8000/events', event, { headers });
  }
}
