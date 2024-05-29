import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterUserService } from '../../../shared/core/services/users/register-user.service';
import { CommonModule } from '@angular/common';
import { RegisterUser } from '../../../shared/models/registerUser.models';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private registerService = inject(RegisterUserService);

  user: RegisterUser = {
    username: '',
    email: '',
    password: '',
  };

  confirmPassword = '';

  constructor(private router: Router) {}

  registerUser(form: NgForm) {
    if (form.valid && this.user.password === this.confirmPassword) {
      console.log('User to register:', this.user);
      this.registerService.postUser(this.user).subscribe({
        next: (response: User) => {
          console.log('User registered successfully', response);
          Swal.fire({
            text: 'Usuario registrado exitosamente',
            icon: 'success',
          });
          // Redirige a la página de login u otra página tras el registro exitoso
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al registrar el usuario', error);
          Swal.fire({
            text: 'Error al registrar el usuario',
            icon: 'error',
          });
        },
        complete: () => {
          console.log('Solicitud de registro completada');
        },
      });
    } else {
      if (this.user.password !== this.confirmPassword) {
        Swal.fire({
          text: 'Las contraseñas no coinciden',
          icon: 'error',
        });;
      } else {
        Swal.fire({
          text: 'Todos los campos son obligatorios',
          icon: 'error',
        });;
      }
    }
  }
}

