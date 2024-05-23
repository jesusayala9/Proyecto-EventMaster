import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterUserService } from '../../../shared/core/services/users/register-user.service';
import { CommonModule } from '@angular/common';
import { RegisterUser } from '../../../shared/models/registerUser.models';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private registerService = inject(RegisterUserService);

  user: RegisterUser = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  registerUser(form: NgForm) {
    if (form.valid) {
      console.log('User to register:', this.user)
      this.registerService.postUser(this.user).subscribe({
        next: (response: User) => {
          console.log('User registered successfully', response);
          // Redirige a la página de login u otra página tras el registro exitoso
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error registering user', error);
        },
        complete: () => {
          console.log('Registration request completed');
        },
      });
    }
  }
}
