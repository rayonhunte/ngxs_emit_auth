import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { AppState } from './app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zoon-console';
  @Emitter(AppState.updateUser)
  public updateUser: Emittable<void>;

  constructor(afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(
      // get current user data when state changes
      (userData: any) => {
        this.updateUser.emit(userData);
      }
    );
  }
}
