import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { FavoritesService } from './favorites.service';
import { AuthService } from '../../services/auth.service';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, FavoritesListComponent],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent {
  favorites$: Observable<Pokemon[]>;

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly authService: AuthService
  ) {
    this.favorites$ = this.authService.user$.pipe(
      filter((u) => !!u),
      map((u) => u?.uid || ''),
      switchMap((uid) => favoritesService.getFavorites(uid))
    );
  }
}
