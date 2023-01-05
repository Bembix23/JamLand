import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsPageHeaderComponent } from './pokemons-page-header.component';

describe('PokemonsPageHeaderComponent', () => {
  let component: PokemonsPageHeaderComponent;
  let fixture: ComponentFixture<PokemonsPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PokemonsPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
