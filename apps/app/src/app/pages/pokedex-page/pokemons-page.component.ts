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
import {
  filter,
  map,
  Observable,
  startWith,
  switchMap,
  combineLatest,
  of,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonDetailComponent,
    PokemonsPageHeaderComponent,
    PokemonsListComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss'],
})
export class PokemonsPageComponent {
  myControl = new FormControl('');
  model$: Observable<PokemonPageModel>;
  filters$: Observable<string>;
  myPokemon$: Pokemon[] = [];
  favorites$: Pokemon[] = [];
  favoritePokemon = '';
  options: string[] = [];

  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private readonly pokemonsServices: PokemonsService,
    private readonly favoritesService: FavoritesService,
    private readonly auth: AuthService
  ) {
    this.filters$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map((v) => v || '')
    );
    this.model$ = combineLatest([
      this.pokemonsServices.getPokemonsList(),
      this.filters$,
    ]).pipe(
      map(([pokemonList, filter]) => {
        // make any calculation
        this.filteredOptions = of(this.options);
        pokemonList.pokemons = pokemonList.pokemons.filter((elem) =>
          elem.name.toLowerCase().includes(filter.toLowerCase())
        );

        return pokemonList;
      })
    );

    this.model$.subscribe((pokemons) => {
      console.log(`Received ${pokemons.pokemons.length} pokemons`);
      pokemons.pokemons.forEach((pokemon) => this.options.push(pokemon.name));
    });
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
      });
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.model$.subscribe((pokemons) => {
      pokemons.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      );
    });

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
