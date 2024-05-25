import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { UserInfoService } from '../../../shared/core/services/users/user-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  user: User | null = null;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit(): void {
    this.userInfoService.getCurrentUser().subscribe({
      next: (user: User | null) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching current user info', error);
      }
    });
  }
}
