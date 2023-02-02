import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../model/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [CommonModule, PokemonDetailComponent],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() favorits: Pokemon[] = [];
  @Output() favorite = new EventEmitter<Pokemon>();
  @Output() removefavorite = new EventEmitter<Pokemon>();

  setFavoritePokemon($event: Pokemon) {
    this.favorite.emit($event);
  }

  deleteFavoritePokemon($event: Pokemon) {
    this.removefavorite.emit($event);
  }
}
