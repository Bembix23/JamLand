import { Router, RouterModule } from '@angular/router';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonsPageComponent } from './pages/pokedex-page/pokemons-page.component';
import { TranslateService } from '@ngx-translate/core';
import { en } from './translations/en';
import { fr } from './translations/fr';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';


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
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;


  constructor(
    private readonly translate: TranslateService,
    private readonly authService: AuthService,
    private readonly router: Router
    ) {
    translate.setTranslation('en', en);
    translate.setTranslation('fr', fr);
    translate.setDefaultLang('fr');

    translate.use('fr');

    if (this.isLoggedIn$) {
      this.router.navigateByUrl('/');
    }
  }
}
