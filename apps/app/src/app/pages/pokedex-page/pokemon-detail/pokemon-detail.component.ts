import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;
  @Input() favorits: Pokemon[] = [];

  @Output() isFavorite = new EventEmitter<Pokemon>();
  @Output() notFavorite = new EventEmitter<Pokemon>();

  setFavorite() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.isFavorite.emit(this.pokemon!);
  }
  deleteFavorite() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.notFavorite.emit(this.pokemon!);
  }

  isFavorit(pokemon: Pokemon) {
    console.log('isFavorit', this.favorits);
    return this.favorits.filter((fav) => fav.name === pokemon.name).length > 0;
  }
}
