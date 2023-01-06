import { RouterModule } from '@angular/router';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HuntPageComponent } from './pages/hunt-page/HuntPage.component';
import { TranslateService } from '@ngx-translate/core';
import { en } from './translations/en';
import { fr } from './translations/fr';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    HuntPageComponent,
  ],
  selector: 'app-root',
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  title = 'app';
  version = 'Prime';
  @HostBinding('class') class = 'app';

  constructor(private readonly translate: TranslateService) {
    translate.setTranslation('en', en);
    translate.setTranslation('fr', fr);
    translate.setDefaultLang('fr');

    translate.use('fr');
  }
}
