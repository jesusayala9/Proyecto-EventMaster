import { Component } from '@angular/core';
import { SearchbarComponent } from '../../../shared/components/searchbar/searchbar.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-searched',
  standalone: true,
  imports: [SearchbarComponent, EventCardComponent],
  templateUrl: './searched.component.html',
  styleUrl: './searched.component.css'
})
export class SearchedComponent {

}
