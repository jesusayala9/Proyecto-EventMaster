import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../../../shared/components/searchbar/searchbar.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [SearchbarComponent, EventCardComponent, RouterLink],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.css'
})
export class SearchedComponent {

}
