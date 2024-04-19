import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from '../../components/event/event.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, EventComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

}
