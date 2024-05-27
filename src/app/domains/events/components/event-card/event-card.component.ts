import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../shared/models/event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  @Input() events!: Event;
  @Output() joinEvent = new EventEmitter<number>();


  onJoinClick() {
    if (this.events && this.events.id) {
      this.joinEvent.emit(this.events.id);
    } else {
      console.error('Event ID is undefined');
    }
  }
}
