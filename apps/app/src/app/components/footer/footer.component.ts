import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() version = '';
  constructor(private readonly router: Router) {}

  goToProfil() {
    this.router.navigateByUrl('profil');
  }
  goToPokedex() {
    this.router.navigateByUrl('pokedex');
  }
  goToHunt() {
    this.router.navigateByUrl('hunt');
  }
}
