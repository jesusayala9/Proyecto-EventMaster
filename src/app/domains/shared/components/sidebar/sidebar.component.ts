import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/users/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  username: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    this.loginService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        this.username = user.username;
      } else {
        this.username = 'Invitado';
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
