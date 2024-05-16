import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  searchTerm: string = ''; // Propiedad para almacenar el valor del searchbar
  @Output() search: EventEmitter<string> = new EventEmitter<string>(); // Evento para emitir el término de búsqueda

  onSubmit() {
    this.search.emit(this.searchTerm); // Emitir el término de búsqueda cuando se envía el formulario
  }
}
