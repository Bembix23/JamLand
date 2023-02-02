import { Injectable } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPageModel } from './model/pokemon-page-model';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

interface ApiPokemon {
  image: any;
  apiTypes: any;
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
  constructor(
    private readonly auth: AuthService,
    private readonly httpService: HttpClient,
    private readonly firestore: Firestore
  ) {}

  getPokemonsList(): Observable<PokemonPageModel> {
    return this.httpService
      .get<ApiPokemon[]>('https://pokebuildapi.fr/api/v1/pokemon/limit/100', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => ({
          pokemons: response.map((p) => ({
            id: p.id,
            name: p.name,
            image_url: p.image,
            types: p.apiTypes.map((t: { image: any }) => t.image),
          })),
        }))
      );
  }

  getPersonalPokemon(userId: string): Observable<Pokemon[]> {
    const myPokemon = collection(
      this.firestore,
      `myPokemons/${userId}/pokemon`
    );

    return collectionData(myPokemon, {
      idField: 'id',
    }) as Observable<Pokemon[]>;
  }
}
