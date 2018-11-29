import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  restForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]]
  });

  resetMsg: string = undefined;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  OnReset() {
    const {email} = this.restForm.value;
    this.authService.restEmail(email).then(
      () => {
        this.resetMsg = 'Check Your Email';
      }
    ).catch(
      err => {
        this.resetMsg = err.message;
      }
    );
  }

}
