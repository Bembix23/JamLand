import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsPageComponent } from './pokemons-page.component';

describe('PokemonsPageComponent', () => {
  let component: PokemonsPageComponent;
  let fixture: ComponentFixture<PokemonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PokemonsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
