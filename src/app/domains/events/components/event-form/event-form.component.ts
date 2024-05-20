import { Component, inject } from '@angular/core';
import { CreateEventService } from '../../../shared/core/services/event/createEvent/create-event.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterEvent } from '../../../shared/models/registerEvent';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  private createEventService = inject(CreateEventService);

  event: RegisterEvent = {
    title: '',
    description: '',
    start_time: '',
    finish_time: '',
    category: '',
    audience: 0,
    type: '',
    location: '',
  };

  constructor(private router: Router) {}

  createEvent(form: NgForm) {
    if (form.valid) {
      console.log('Event to create:', this.event); // Imprimir los datos del evento antes de enviar la solicitud
      this.createEventService.postEvent(this.event).subscribe({
        next: (response: Event) => {
          console.log('Evento creado satisfactoriamente', response);
          form.resetForm();
        },
        error: (error) => {
          console.error('Error al crear el evento', error);
        },
        complete: () => {
          console.log('Petición de creación completada');
        },
      });
    }
  }
}
