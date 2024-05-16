import { Component } from '@angular/core';
import { SidebarComponent } from './domains/shared/components/sidebar/sidebar.component';
import { ListComponent } from './domains/events/pages/list/list.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from './domains/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent, ListComponent, LayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-event-master';
}
