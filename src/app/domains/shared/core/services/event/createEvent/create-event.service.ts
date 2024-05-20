import { Injectable, inject } from '@angular/core';
import { RegisterEvent } from '../../../../models/registerEvent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateEventService {
  private http = inject(HttpClient);

  constructor() {}

  postEvent(event: RegisterEvent): Observable<Event> {
    return this.http.post<Event>('http://127.0.0.1:8000/events', event);
  }
}
