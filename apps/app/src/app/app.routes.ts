import { Route } from '@angular/router';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'pokedex', component: PokemonsPageComponent },
  //{ path: 'hunt', component: HuntPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
