import { Injectable } from '@angular/core';
import { catchError, from, map, NEVER, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PokemonPageModel } from './model/pokemon-page-model';
import {
  doc,
  docData,
  Firestore,
  updateDoc,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

interface ApiPokemon {
  id: string;
  name: string;
  image: string;
}


@Injectable({
  providedIn: 'root',
})
export class HuntService {
  constructor(
    private readonly httpService: HttpClient,
    private readonly firestore: Firestore,
    private readonly auth: Auth
    ) {}

  private displayFailedPopup() {
    console.log('Ajout raté');
    return;
  }

  getPokemonsList(): Observable<PokemonPageModel> {
    return this.httpService
      .get<ApiPokemon[]>(
        'https://pokebuildapi.fr/api/v1/pokemon/limit/100', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => ({
          pokemons: response.map((p) => ({
            id: p.id,
            name: p.name,
            image_url: p.image
          })),
        }))
      );
  }

  sendPokemon (id: string, name: string) {
    console.log('ici2')
    const item = collection(this.firestore, `myPokemons/${this.auth?.currentUser?.uid}/pokemon`);
    from(addDoc(item, { id, name }))
    .pipe(
      catchError(() => {
        this.displayFailedPopup();
        console.log('send pokemon fail')
        return NEVER;
      }),
      take(1)
    )
    .subscribe(() => {
      console.log('pokemon ajouté')
    });
    const event = collection(this.firestore, 'event');
    from(addDoc(event, { name: this.auth?.currentUser?.email, pokemon: name }))
    .pipe(
      catchError(() => {
        this.displayFailedPopup();
        console.log('send event fail')
        return NEVER;
      }),
      take(1)
    )
    .subscribe(() => {
      console.log('event ajouté')
    });
  }

  getTimers(id: string) {
    const itemsCollection = doc(this.firestore, `timers/${id}`);
    return docData(itemsCollection, { idField: 'id' });
  }

  updateTimers (
    number: number,
    type: string
  ) {
    console.log('2', type)
    const item = doc(this.firestore, `timers/${this.auth?.currentUser?.uid}`);
    from(updateDoc(item, { [type]: number }))
    .pipe(
      catchError(() => {
        this.displayFailedPopup();
        console.log('update timer fail')
        return NEVER;
      }),
      take(1)
    )
    .subscribe(() => {
      console.log('lost energie')
    });
  }
}
