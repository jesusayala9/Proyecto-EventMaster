import { Component, inject } from '@angular/core';
import { CreateEventService } from '../../../shared/core/services/event/createEvent/create-event.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterEvent } from '../../../shared/models/registerEvent';
import { LoginService } from '../../../shared/core/services/users/login.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {

  event: RegisterEvent = {
    title: '',
    description: '',
    start_time: '',
    finish_time: '',
    category: '',
    type: '',
    location: '',
    creator_id: 0
  };
  constructor(
    private loginService: LoginService,
    private createEventService: CreateEventService,
    private router: Router
  ) {}

  createEvent(form: NgForm) {
    if (form.valid) {
      if (this.loginService.isAuthenticated()) {
        firstValueFrom(this.loginService.getCurrentUser()).then(
          (user) => {
            if (user && user.id) {
              const event: RegisterEvent = {
                title: form.value.title,
                description: form.value.description,
                start_time: new Date(form.value.start_time).toISOString(),
                finish_time: new Date(form.value.finish_time).toISOString(),
                category: form.value.category,
                type: form.value.type,
                location: form.value.location,
                creator_id: user.id,
              };

              console.log('Evento antes de ser enviado:', event);

              firstValueFrom(this.createEventService.postEvent(event)).then(
                (response: Event | undefined) => {
                  if (response) {
                    console.log('Evento creado satisfactoriamente', response);
                    alert('Evento creado satisfactoriamente');
                    form.resetForm();
                  } else {
                    console.error('No se recibió una respuesta del servidor');
                  }
                },
                (error) => {
                  console.error('Error al crear el evento', error);
                  alert('Error al crear el evento');
                }
              ).catch(error => console.error('Petición de creación fallida', error));
            } else {
              console.error('No se pudo obtener el usuario actual o su ID');
              this.router.navigate(['/login']);
            }
          },
          (error: any) => {
            console.error('Error al obtener el usuario actual', error);
            this.router.navigate(['/login']);
          }
        ).catch(error => console.error('Petición de usuario actual fallida', error));
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  }

