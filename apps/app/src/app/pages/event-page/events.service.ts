import { Injectable } from '@angular/core';
import { Event } from '../model/event';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventPageModel } from './model/event-page-model';
import { collection, Firestore, getDocs } from '@firebase/firestore';
import { collectionData } from '@angular/fire/firestore';

interface ApiEvent {
  name: string;
  pokemon: string;
}

interface GetEventsApiResponse {
  results: ApiEvent[];
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private readonly httpService: HttpClient,
    private readonly firestore: Firestore,
    ) {}

  // getEventsList(): Observable<EventPageModel> {
  //   return this.httpService
  //     .get<GetEventsApiResponse>(
  //       'https://pokeapi.co/api/v2/event?limit=20&offset=0',
  //       {
  //         headers: { Accept: 'application/json' },
  //       }
  //     )
  //     .pipe(
  //       map((response) => ({
  //         events: response.results.map((p) => ({
  //           id: p.name,
  //           pun: p?.pokemon,
  //         })),
  //       }))
  //     );
  // }

  // getEvents(): Observable<Event[]> {
  //   const favorites = collection(this.firestore, 'event');
    
  //   return getDocs(favorites).forEach(doc => {
  //     console.log(doc.data());
  // })
  //     ;
  // }

  // getTest(): Observable<Event[]> {
  //   const favorites = collection(this.firestore, 'event');
  //   return getDocs(favorites) as Observable<Event[]>;
  // }

  getInfo(): Observable<Event[]> {
    const itemsCollection = collection(this.firestore, `Infos`);
    return collectionData(itemsCollection) as Observable<Event[]>;
  }
}
