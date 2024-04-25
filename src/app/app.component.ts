import { Component } from '@angular/core';
import { SidebarComponent } from './domains/shared/components/sidebar/sidebar.component';
import { ListComponent } from './domains/events/pages/list/list.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-event-master';
}
