import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})

export class LoginPageComponent {
  loginForm = this.formBuilder.group({
    login: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  get login() {
    return this.loginForm.get('login');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService
  ) {}

  doLogin() {
    console.log(this.loginForm.value);
  }

  getLoginLabel(): string {
    return this.translateService.instant('login.form.loginLabel');
  }
}
