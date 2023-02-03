import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPageHeaderComponent } from './events-page-header.component';

describe('EventsPageHeaderComponent', () => {
  let component: EventsPageHeaderComponent;
  let fixture: ComponentFixture<EventsPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EventsPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
