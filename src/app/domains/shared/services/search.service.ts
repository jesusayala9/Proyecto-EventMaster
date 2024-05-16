import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private http = inject(HttpClient);

  constructor() {}

  getEventsby(query: string){
    return this.http.get<Event[]>(`http://127.0.0.1:8000/events/search/?Title_or_Category_or_Type=${query}`)
  }

}
