import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  constructor() {}

  getEvents(){
    return this.http.get<Event[]>('http://127.0.0.1:8000/events')
  }

}
