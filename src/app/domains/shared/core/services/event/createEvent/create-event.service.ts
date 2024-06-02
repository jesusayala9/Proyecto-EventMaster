import { Injectable, inject } from '@angular/core';
import { RegisterEvent } from '../../../../models/registerEvent';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class CreateEventService {
  constructor(private http: HttpClient) {}

  postEvent(event: RegisterEvent): Observable<Event> {
    const apiUrl = environment.apiUrl;
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Event>(`${apiUrl}/events`, event, { headers });
  }
}
