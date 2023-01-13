import { Route } from '@angular/router';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';


export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: PokemonsPageComponent },
  { path: 'profil', component: ProfilPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
