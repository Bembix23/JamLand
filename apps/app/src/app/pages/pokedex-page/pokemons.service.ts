import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPageModel } from './model/pokemon-page-model';

interface ApiPokemon {
  id: string;
  name: string;
}

interface GetPokemonsApiResponse {
  results: ApiPokemon[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private readonly httpService: HttpClient) {}

  getPokemonsList(): Observable<PokemonPageModel> {
    return this.httpService
      .get<GetPokemonsApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => ({
          pokemons: response.results.map((p) => ({
            id: p.id,
            pun: p.name,
          })),
        }))
      );
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.httpService
      .get<GetPokemonsApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) =>
          response.results.map((p) => ({
            id: p.id,
            pun: p.name,
          }))
        )
      );
  }
}
