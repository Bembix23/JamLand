import { Injectable } from '@angular/core';
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  collectionData,
  Firestore,
  getDoc,
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
    this.auth.user$.subscribe((elem) => {
      const favorites = collection(
        this.firestore,
        `favorites/${elem?.uid}/pokemons`
      );
      addDoc(favorites, pokemon);
    });
  }

  deletePokemon(pokemon: Pokemon) {
    this.auth.user$.subscribe((elem) => {
      const favorites = collection(
        this.firestore,
        `favorites/${elem?.uid}/pokemons`
      );

      const data = collectionData(favorites, {
        idField: 'id',
      }) as Observable<Pokemon[]>;

      data.subscribe((favs) => {
        favs.forEach((element) => {
          if (element.name === pokemon.name) {
            const titi = doc(
              this.firestore,
              `favorites/${elem?.uid}/pokemons/${element.id}`
            );
            from(deleteDoc(titi));
          }
        });
      });
    });
  }
}
