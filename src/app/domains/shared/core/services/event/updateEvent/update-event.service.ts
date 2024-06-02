import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../../../models/event.model';
import { environment } from '../../../../../../environments/environments.prod';
@Injectable({
  providedIn: 'root',
})
export class UpdateEventService {
  constructor(private http: HttpClient) {}

  getEventDetails(eventId: string): Observable<Event> {
    const apiUrl = environment.apiUrl;
    return this.http.get<Event>(`${apiUrl}/${eventId}`);
  }

  updateEvent(eventId: string, eventData: any): Observable<Event> {
    const apiUrl = environment.apiUrl;
    return this.http.put<Event>(`${apiUrl}/${eventId}`, eventData);
  }
}
