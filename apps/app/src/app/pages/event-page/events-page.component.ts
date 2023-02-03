import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsService } from './events.service';
import { Observable,map  } from 'rxjs';
import { EventPageModel } from './model/event-page-model';
import { EventsPageHeaderComponent } from './events-page-header/events-page-header.component';
import { EventsListComponent } from './events-list/events-list.component';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [
    CommonModule,
    EventDetailComponent,
    EventsPageHeaderComponent,
    EventsListComponent,
  ],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent {
  model$: Observable<EventPageModel>;
  constructor(
    private readonly eventsServices: EventsService,
  ) {
    this.model$ = eventsServices.getInfo().pipe(map(events => ({events})));
    console.log(this.model$)
  }
}
