import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { filter, map, Subject, switchMap, take } from 'rxjs';
import { Observable } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [
    WebcamModule,
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
  trigger$ = new Subject<void>();
  @ViewChild('filePreview')
private filePreview!: ElementRef;

  get profil() {
    return this.profilForm.get('profil');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly auth: Auth,
    private readonly storage: Storage,
    private readonly router: Router,
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
    this.router.navigate(['home']);
  }
  takePhoto() {
    this.trigger$.next();
  }

  handleSnapshot($event: WebcamImage) {
    this.filePreview.nativeElement.src = $event.imageAsDataUrl;

    const base64Img = $event.imageAsBase64;

    const u8arr = this.toByteArray(base64Img);
    const filename = 'tmp.jpeg';
    const file: File = new File([u8arr], filename, { type: 'image/jpeg' });

    const fileDetails = ref(this.storage, filename);
    uploadBytes(fileDetails, file)
      .then(() => {
        return getDownloadURL(fileDetails);
      })
      .then((url) => console.log(url));

    /** As observable  :
     * from(uploadBytes(fileDetails, file))
     *       .pipe(switchMap(() => getDownloadURL(fileDetails)))
     *       .subscribe((url) => console.log(url));
     */
  }

  hasPreview() {
    const preview = this.filePreview?.nativeElement?.src;
    return preview && !preview.includes('#');
  }

  private toByteArray(base64Img: string) {
    const bstr = atob(base64Img);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return u8arr;
  }
}
