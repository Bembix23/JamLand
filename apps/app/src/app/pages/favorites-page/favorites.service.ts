import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private readonly firestore: Firestore) {}

  getFavorites(userId: string): Observable<Pokemon[]> {
    const favorites = collection(this.firestore, `favorites/${userId}/jokes`);
    return collectionData(favorites, {
      idField: 'id',
    }) as Observable<Pokemon[]>;
  }
}
