import { Route } from '@angular/router';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HuntPageComponent } from './pages/hunt-page/hunt-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profil', component: ProfilPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'pokedex', component: PokemonsPageComponent },
  { path: 'hunt', component: HuntPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pokedex' },
];
