import { Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  user as firebaseUser
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = firebaseUser(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  constructor(private firebaseAuth: Auth) {
    this.user$.subscribe((user: User | null | undefined) => {
      this.currentUserSig.set(user);
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(
        response => {
          return updateProfile(response.user, { displayName: username });
        });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => { });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut().then(() => {
      this.currentUserSig.set(null);
    });
    return from(promise);
  }
}
