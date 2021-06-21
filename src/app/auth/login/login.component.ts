import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {AuthGuard} from '@core/guards/auth.guard';

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
    public router: Router,
    public auth: AuthService,
    private authGuard: AuthGuard
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login(this.loginForm.value).subscribe(async (dt) => {
      localStorage.setItem('token', dt?.token || '');
      await this.router.navigateByUrl(this.authGuard.redirectUrl || '/');
    });
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
