import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { FormBuilder, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Select(AppState.IsAuth)
  isAuth$:Observable<boolean>;
  
  @Emitter(AppState.login)
  public _OnLogin: Emittable<void>;


  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(8),
      Validators.maxLength(25)
    ]]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.isAuth$.subscribe(
      (authStatus: boolean) => {
        if(authStatus) {
          this.router.navigate(['home']);
        }
      }
    )
  }

  OnLogin(): void {
    this._OnLogin.emit(this.loginForm.value);
  }

}
