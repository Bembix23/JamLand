import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { Pokemon } from '../model/pokemon';
import { PokemonsService } from './pokemons.service';
import { Observable } from 'rxjs';
import { PokemonPageModel } from './model/pokemon-page-model';
import { PokemonsPageHeaderComponent } from './pokemons-page-header/pokemons-page-header.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesService } from '../favorites-page/favorites.service';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonDetailComponent,
    PokemonsPageHeaderComponent,
    PokemonsListComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss'],
})
export class PokemonsPageComponent {
  model$: Observable<PokemonPageModel>;
  favoritePokemon = '';

  constructor(
    private readonly pokemonsServices: PokemonsService,
    private readonly favoritesService: FavoritesService
  ) {
    this.model$ = pokemonsServices.getPokemonsList();
  }

  setFavoritePokemon(pokemon: Pokemon) {
    console.log('isFavorite called with', pokemon);
    this.favoritesService.addPokemon(pokemon);
    this.favoritePokemon = pokemon.name;
  }
}
