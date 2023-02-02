import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { filter, map, switchMap, take } from 'rxjs';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss'],
})
export class ProfilPageComponent {
  // infoUser$: Observable<Info>;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  profilForm = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>(''),
    bio: new FormControl<string>('test', Validators.required),
    name: new FormControl<string>('', Validators.required),
    firstname: new FormControl<string>('', Validators.required),
    trading: new FormControl<boolean>(false),
    viewOther: new FormControl<boolean>(false),
  });

  get profil() {
    return this.profilForm.get('profil');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly auth: Auth
  ) {
    this.authService.user$
      .pipe(
        filter((u) => !!u),
        map((u) => u?.uid || ''),
        switchMap((uid) => this.authService.getInfo(uid)),
        take(1)
      )
      .subscribe((u) => {
        this.profilForm.setValue({
          email: auth.currentUser?.email || '',
          password: '',
          bio: u['bio'] || '',
          name: u['name'] || '',
          firstname: u['firstname'] || '',
          trading: u['trading'] || false,
          viewOther: u['viewOther'] || false,
        });
      });
  }

  doProfil() {
    console.log('ici');
    console.log(this.authService.user$);
    const { email, password, bio, name, firstname, trading, viewOther } =
      this.profilForm.value;
    this.authService.updateInfo(
      email || '',
      password || '',
      bio || '',
      name || '',
      firstname || '',
      trading || false,
      viewOther || false
    );
  }

  getProfilLabel(): string {
    return this.translateService.instant('profil.form.profilLabel');
  }
  logout() {
    this.auth.signOut();
  }
}
