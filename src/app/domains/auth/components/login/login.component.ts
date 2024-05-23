import { NgForm } from '@angular/forms';
import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../shared/core/services/users/login.service';
import { LoginUser } from '../../../shared/models/loginUser.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Token } from '../../../shared/models/token.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private loginService = inject(LoginService);

  user: LoginUser = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  loginUser(form: NgForm) {
    if (form.valid) {
      console.log('User log:', this.user);
      this.loginService.loginUser(this.user).subscribe({
        next: (response: Token) => {
          console.log('User logged in successfully', response);
          // Almacena el token en el almacenamiento
          localStorage.setItem('access_token', response.access_token);
          // Redirige a la página principal
          this.router.navigate(['/index']);
        },
        error: (error) => {
          console.error('Error logging in user', error);
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    }
  }
}
