import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { from, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private readonly auth: AuthService,
    private readonly firestore: Firestore
  ) {}

  getFavorites(userId: string): Observable<Pokemon[]> {
    const favorites = collection(
      this.firestore,
      `favorites/${userId}/pokemons`
    );
    return collectionData(favorites, {
      idField: 'id',
    }) as Observable<Pokemon[]>;
  }

  addPokemon(pokemon: Pokemon): void {
    this.auth.user$
      .pipe(
        map((u) => u?.uid || ''),
        switchMap((userId) => {
          const favorites = collection(
            this.firestore,
            `favorites/${userId}/pokemons`
          );
          return from(addDoc(favorites, pokemon));
        }),
        take(1)
      )
      .subscribe();
  }
}
