import { SearchService } from './../../../shared/services/search.service';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../../../shared/components/searchbar/searchbar.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { Event } from '../../../shared/models/event.model';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../shared/services/event.service';


@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [SearchbarComponent, EventCardComponent, RouterLink, CommonModule],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.css',
})
export class SearchedComponent {
  event = signal<Event[]>([]);
  private eventService = inject(EventService);
  private searchService = inject(SearchService)


  ngOnInit() {
    this.getEvents();
    this.searchEvents("")
  }

  private getEvents() {
    this.eventService.getEvents().subscribe({
      next: (event) => {
        this.event.set(event);
      },
      error: () => {},
    });
  }

  searchEvents(query: string) {
    this.searchService.getEventsby(query).subscribe({
      next: (data) => {
        this.event.set(data); // Usar el método set para un objeto WritableSignal
      },
      error: () => {},
    });
  }
}
