import { Route } from '@angular/router';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: PokemonsPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
