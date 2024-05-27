import { SearchService } from '../../../shared/core/services/event/searchEvent/search.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../../../shared/components/searchbar/searchbar.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { Event } from '../../../shared/models/event.model';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../shared/core/services/event/events/event.service';
import { UserEventsService } from '../../../shared/core/services/event/userEvents/user-events.service';

@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [SearchbarComponent, EventCardComponent, RouterLink, CommonModule],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.css',
})
export class SearchedComponent implements OnInit {
  event = signal<Event[]>([]);
  private eventService = inject(EventService);
  private searchService = inject(SearchService);
  private userEventsService = inject(UserEventsService);

  ngOnInit() {
    this.getEvents();
  }

  private getEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        console.log('Fetched events:', events);
        this.event.set(events);
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
    });
  }

  searchEvents(query: string) {
    this.searchService.getEventsby(query).subscribe({
      next: (data) => {
        this.event.set(data);
      },
      error: (error) => {
        console.error('Error searching events:', error);
      },
    });
  }

  onJoinEvent(eventId: number) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    // Check if the user is already registered for the event
    this.userEventsService.getEventsByUser().subscribe({
      next: (userEvents) => {
        const isAlreadyJoined = userEvents.some(event => event.id === eventId);

        if (isAlreadyJoined) {
          alert('Ya estás inscrito a este evento.');
        } else {
          this.userEventsService.addUserToEvent(userId, eventId).subscribe({
            next: () => {
              console.log('User joined event with ID:', eventId);
              alert('Te has inscrito al evento exitosamente.');
            },
            error: (error) => {
              console.error('Error joining user to event:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error fetching user events:', error);
      },
    });
  }


}
