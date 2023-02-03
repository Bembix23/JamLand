import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../model/event';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, EventDetailComponent],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent {
  @Input() events: Event[] = [];
}
