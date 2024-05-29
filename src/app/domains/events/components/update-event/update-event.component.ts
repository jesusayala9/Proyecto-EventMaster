import { Component, OnInit } from '@angular/core';
import { UpdateEventService } from '../../../shared/core/services/event/updateEvent/update-event.service';
import { UserInfoService } from '../../../shared/core/services/users/user-info.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Event } from '../../../shared/models/event.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {
  currentUserId: number | null = null;
  eventId: string = '';
  eventData: Event | null = null;

  title: string = '';
  description: string = '';
  category: string = '';
  start_time: string = '';
  finish_time: string = '';
  type: string = '';
  location: string = '';
  creator_id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private updateEventService: UpdateEventService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    this.currentUserId = userId ? Number(userId) : null; // Convertir a número
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    // Asignar el valor del ID del usuario en sesión a creator_id
    if (this.currentUserId) {
      this.creator_id = this.currentUserId;
      console.log('Creator ID:', this.creator_id);
    }
    console.log('Event ID:', this.eventId);

    if (this.eventId) {
      this.updateEventService.getEventDetails(this.eventId).subscribe({
        next: (event: Event) => {
          this.userInfoService.getCurrentUser().subscribe({
            next: (user) => {
              if (user && event.creator_id === user.id) {
                this.eventData = event;
                this.title = event.title;
                this.description = event.description;
                this.category = event.category;
                this.start_time = event.start_time;
                this.finish_time = event.finish_time;
                this.type = event.type;
                this.location = event.location;
              } else {
                Swal.fire({
                  text: 'No tienes permiso para actualizar este evento',
                  icon: 'error',
                });
              }
            },
            error: (error) => {
              console.error('Error fetching user info', error);
            },
          });
        },
        error: (error) => {
          console.error('Error fetching event details', error);
        },
      });
    }
  }

  onUpdateEvent(form: NgForm) {
    if (form.valid) {
      // Verificar que creator_id esté definido y no sea null o undefined
      if (this.creator_id !== null && this.creator_id !== undefined) {
        console.log('Valor de creator_id:', this.creator_id); // Imprimir el valor de creator_id

        // Construir el objeto de datos actualizado
        const updatedEventData = {
          title: this.title,
          description: this.description,
          category: this.category,
          start_time: this.start_time,
          finish_time: this.finish_time,
          type: this.type,
          location: this.location,
          creator_id: this.creator_id// Incluir el creator_id en el objeto de datos actualizado
        };

        console.log('Datos actualizados:', updatedEventData); // Imprimir los datos actualizados

        // Llamar al servicio updateEventService para actualizar el evento
        this.updateEventService
          .updateEvent(this.eventId, updatedEventData)
          .subscribe({
            next: (updatedEvent: Event) => {
              Swal.fire({
                text: 'Evento actualizado exitosamente',
                icon: 'success',
              });
              form.resetForm();
            },
            error: (error) => {
              console.error('Error updating event', error);
              Swal.fire({
                text: 'Error al actualizar el evento',
                icon: 'error',
              });

            },
          });
      } else {
        // Mostrar un mensaje de error si creator_id es null o undefined
        console.error('El valor de creator_id es null o undefined');
        Swal.fire({
          text: 'Error al actualizar el evento. El creador del evento no está definido.',
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        text: 'Por favor, completa todos los campos obligatorios.',
        icon: 'warning',
      });
    }
  }
}
