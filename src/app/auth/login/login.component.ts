import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subscriptions: Subscription[] = [];
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {

  }

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get pass(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
