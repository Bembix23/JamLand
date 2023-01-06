import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../model/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [CommonModule, PokemonDetailComponent],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Output() favorite = new EventEmitter<Pokemon>();

  setFavoritePokemon($event: Pokemon) {
    this.favorite.emit($event);
  }
}
