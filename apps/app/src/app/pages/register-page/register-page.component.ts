import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
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
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerForm = this.formBuilder.group({
    register: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
    bio: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    firstname: new FormControl<string>('', Validators.required),
    trading: new FormControl<boolean>(false),
    viewOther: new FormControl<boolean>(false),
  });

  get register() {
    return this.registerForm.get('register');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly auth: AuthService
  ) {}

  doRegister() {
    const { register, password, bio, name, firstname, trading, viewOther } = this.registerForm.value;
    this.auth.register(
      register || '',
      password || '',
      bio || '',
      name || '',
      firstname || '',
      trading || false,
      viewOther || false,
      );
  }

  getRegisterLabel(): string {
    return this.translateService.instant('register.form.registerLabel');
  }
}
