import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateEmail,
  updatePassword,
} from '@angular/fire/auth';
import { catchError, from, map, NEVER, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import {
  doc,
  setDoc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Info } from '../pages/model/info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean> = authState(this.auth).pipe(
    // tap(console.log),
    map((user) => !!user)
  );

  user$: Observable<User | null> = authState(this.auth);

  constructor(private readonly auth: Auth, private router: Router, private readonly firestore: Firestore) {}

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(() => {
          this.displayFailedPopup();
          return NEVER;
        }),
        take(1)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  register(
    email: string,
    password: string,
    bio: string,
    name: string,
    firstname: string,
    trading: boolean,
    viewOther: boolean,
    ) {
    from(createUserWithEmailAndPassword(this.auth, email, password).then(() => {
      const item = doc(this.firestore, `Infos/${this.auth?.currentUser?.uid}`);
      setDoc(item, { bio, name, firstname, trading, viewOther })
      const timer = doc(this.firestore, `timers/${this.auth?.currentUser?.uid}`);
      return setDoc(timer, {
      energie: 1,
      pokeball: 1,
      superball: 1,
      hyperball: 1,
      masterball: 1,
    })
    }))
      .pipe(
        catchError(() => {
          this.displayFailedPopup();
          return NEVER;
        }),
        take(1)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  updateInfo (
    email: string,
    password: string,
    bio: string,
    name: string,
    firstname: string,
    trading: boolean,
    viewOther: boolean,) {
    console.log('ici2')
    const item = doc(this.firestore, `Infos/${this.auth?.currentUser?.uid}`);
    from(setDoc(item, { bio, name, firstname, trading, viewOther }))
    .pipe(
      catchError(() => {
        this.displayFailedPopup();
        return NEVER;
      }),
      take(1)
    )
    .subscribe(() => {
      console.log('c bon')
    });
    if (this.auth.currentUser) {
      if (email !== this.auth.currentUser.email) {
        from(updateEmail(this.auth.currentUser, email))
        .pipe(
          catchError(() => {
            this.displayFailedPopup();
            return NEVER;
          }),
          take(1)
        )
        .subscribe(() => {
          console.log('c bon pour le mail')
        });
      }
      if (password) {
        from(updatePassword(this.auth.currentUser, password))
        .pipe(
          catchError(() => {
            this.displayFailedPopup();
            return NEVER;
          }),
          take(1)
        )
        .subscribe(() => {
          console.log('c bon pour le password')
        });
      }
    }
  }

  private displayFailedPopup() {
    console.log('Login failed');
    return;
  }

  signOut() {
    from(signOut(this.auth))
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/'));
  }

  getInfo(id: string) {
    console.log('ifi', id)
    const itemsCollection = doc(this.firestore, `Infos/${id}`);
    return docData(itemsCollection, { idField: 'id' });
  }

  get2(userId: string): Observable<Info> {
    const itemsCollection = doc(this.firestore, `Users/${userId}`);

    return docData(itemsCollection, {
      idField: 'id',
    }) as Observable<Info>;
  }

}
