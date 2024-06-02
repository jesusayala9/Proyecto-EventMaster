import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../../../models/event.model';
import { environment } from '../../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private http = inject(HttpClient);

  constructor() {}

  getEventsby(query: string){
    const apiUrl = environment.apiUrl;
    return this.http.get<Event[]>(`${apiUrl}/events/search/?Title_or_Category_or_Type=${query}`)
  }

}
