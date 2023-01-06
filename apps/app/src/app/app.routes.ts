import { Route } from '@angular/router';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '', component: PokemonsPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
