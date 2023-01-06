import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  goToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.signOut();
  }
}