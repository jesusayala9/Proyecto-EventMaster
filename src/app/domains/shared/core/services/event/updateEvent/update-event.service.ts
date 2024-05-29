import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateEventService {
  private apiUrl = 'http://127.0.0.1:8000/events';

  constructor(private http: HttpClient) {}

  getEventDetails(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  updateEvent(eventId: string, eventData: any): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, eventData);
  }
}
