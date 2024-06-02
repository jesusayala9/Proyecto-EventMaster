import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Event } from '../../../../models/event.model';
import { environment } from '../../../../../../environments/environments.prod';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  constructor() {}

  getEvents() {
    const apiUrl = environment.apiUrl;
    return this.http.get<Event[]>(`${apiUrl}/events`);
  }
}
