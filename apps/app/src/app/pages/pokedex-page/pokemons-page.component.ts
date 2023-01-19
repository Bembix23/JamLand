import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { Pokemon } from '../model/pokemon';
import { PokemonsService } from './pokemons.service';
import { Observable } from 'rxjs';
import { PokemonPageModel } from './model/pokemon-page-model';
import { PokemonsPageHeaderComponent } from './pokemons-page-header/pokemons-page-header.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesService } from '../favorites-page/favorites.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CommonModule,
    PokemonDetailComponent,
    PokemonsPageHeaderComponent,
    PokemonsListComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss'],
})
export class PokemonsPageComponent implements OnInit {
  model$: Observable<PokemonPageModel>;
  favoritePokemon = '';

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private readonly pokemonsServices: PokemonsService,
    private readonly favoritesService: FavoritesService
  ) {
    this.model$ = pokemonsServices.getPokemonsList();
  }

  setFavoritePokemon(pokemon: Pokemon) {
    console.log('isFavorite called with', pokemon);
    this.favoritesService.addPokemon(pokemon);
    this.favoritePokemon = pokemon.pun;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    this.model$.forEach(
      (pokemon) =>
        // option.toLowerCase().includes(filterValue)
        // pokemon.pun.toLowerCase().includes(filterValue)
        0
    );
  }
}
