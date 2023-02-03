import { Injectable } from '@angular/core';
import { Event } from '../model/event';
import { Observable } from 'rxjs';
import { collectionData, Firestore, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private readonly firestore: Firestore,
    ) {}

  getInfo(): Observable<Event[]> {
    const itemsCollection = collection(this.firestore, `event`);
    return collectionData(itemsCollection) as Observable<Event[]>;
  }
}
