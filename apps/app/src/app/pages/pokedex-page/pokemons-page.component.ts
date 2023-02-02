import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { Pokemon } from '../model/pokemon';
import { PokemonsService } from './pokemons.service';
import { PokemonPageModel } from './model/pokemon-page-model';
import { PokemonsPageHeaderComponent } from './pokemons-page-header/pokemons-page-header.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesService } from '../favorites-page/favorites.service';
import { AuthService } from '../../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { filter, map, Observable, switchMap } from 'rxjs';
import { FavoritsPageModel } from './model/favorits-page-models';

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
  myPokemon$: Pokemon[] = [];
  favorites$: Pokemon[] = [];
  favoritePokemon = '';

  constructor(
    private readonly pokemonsServices: PokemonsService,
    private readonly favoritesService: FavoritesService,
    private readonly auth: AuthService
  ) {
    this.model$ = pokemonsServices.getPokemonsList();
    this.auth.user$
      .pipe(
        filter((u) => !!u),
        map((u) => u?.uid || ''),
        switchMap((uid) => favoritesService.getFavorites(uid))
      )
      .subscribe((f) => {
        this.favorites$ = f;
      });
    this.auth.user$
      .pipe(
        filter((u) => !!u),
        map((u) => u?.uid || ''),
        switchMap((uid) => pokemonsServices.getPersonalPokemon(uid))
      )
      .subscribe((f) => {
        this.myPokemon$ = f;
        console.log(f);
      });
  }

  setFavoritePokemon(pokemon: Pokemon) {
    this.favoritesService.addPokemon(pokemon);
    this.auth.user$.pipe(
      filter((u) => !!u),
      map((u) => u?.uid || ''),
      switchMap((uid) => this.favoritesService.getFavorites(uid))
    );

    this.favoritePokemon = pokemon.name;
  }

  deleteFavoritePokemon(pokemon: Pokemon) {
    this.favoritesService.deletePokemon(pokemon);
    this.auth.user$.pipe(
      filter((u) => !!u),
      map((u) => u?.uid || ''),
      switchMap((uid) => this.favoritesService.getFavorites(uid))
    );

    this.favoritePokemon = pokemon.name;
  }
}
