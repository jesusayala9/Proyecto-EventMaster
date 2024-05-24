import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserEventsService } from '../../../shared/core/services/event/userEvents/user-events.service';
import { Event } from '../../../shared/models/event.model';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];

  constructor(private userEventsService: UserEventsService) {}

  ngOnInit() {
    this.userEventsService.getEventsByUser().subscribe({
      next: (data: Event[]) => {
          this.events = data.sort((a, b) => {
          return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        });
      },
      error: (error) => {
        console.error('Error fetching user events', error);
      }
    });
  }
}
