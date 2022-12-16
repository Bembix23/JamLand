import { RouterModule } from '@angular/router';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    PokemonsPageComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  version = 'Prime';
  @HostBinding('class') class = 'app';
}
