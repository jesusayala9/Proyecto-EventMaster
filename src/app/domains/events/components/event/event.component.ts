import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserEventsService } from '../../../shared/core/services/event/userEvents/user-events.service';
import { Event } from '../../../shared/models/event.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  currentUserId: number | null = null;

  constructor(private userEventsService: UserEventsService) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    this.currentUserId = userId ? Number(userId) : null;

    this.userEventsService.getEventsByUser().subscribe({
      next: (data: Event[]) => {
        this.events = data.map(event => ({
          ...event

        })).sort((a, b) => {
          return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        });
        console.log('Current User ID:', this.currentUserId);
        console.log('Events:', this.events);
      },
      error: (error) => {
        console.error('Error fetching user events', error);
      }
    });
  }

  onDeleteEvent(eventId: number) {
    if (!this.currentUserId) {
      console.error('User ID not found');
      return;
    }

    this.userEventsService.deleteEvent(this.currentUserId.toString(), eventId).subscribe({
      next: () => {
        Swal.fire({
          text: 'Evento eliminado exitosamente',
          icon: 'warning',
        });
        this.events = this.events.filter(event => event.id !== eventId);
      },
      error: (error) => {
        Swal.fire({
          text: 'Error al eliminar el evento',
          icon: 'error',
        });
        console.error('Error al eliminar el evento', error);
      }
    });
  }
}
