import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // login with email
  loginEmail(email: string, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(
      err => {
        // throw auth err
        throw err;
      }
    ).then(
      () => true
    );
  }
  // get user token
  getToken() {
    return this.afAuth.auth.currentUser ? this.afAuth.auth.currentUser.getIdToken() : null
  }

  // reset password
  restEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}
