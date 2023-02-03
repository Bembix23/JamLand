import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
  @Input() version = '';
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    ) {}

  goToProfil() {
    this.router.navigateByUrl('profil');
  }
  goToPokedex() {
    this.router.navigateByUrl('pokedex');
  }
  goToHunt() {
    this.router.navigateByUrl('hunt');
  }
  goToEvent() {
    this.router.navigateByUrl('event');
  }
}
