import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  @Select(AppState.IsAuth)
  isAuth$: Observable<boolean>;

  @Emitter(AppState.logOut)
  public _Logout: Emittable<void>;


  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this._Logout.emit();
    this.router.navigate(['home']);
  }

}
