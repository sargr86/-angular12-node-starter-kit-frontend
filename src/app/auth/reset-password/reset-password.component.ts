import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN, NO_SPACE_PATTERN} from '@core/constants/patterns';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '@core/constants/global';
import {passwordConfirmation} from '@core/helpers/password-confirmation';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@core/services/auth.service';
import {User} from '@shared/models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  email: string;
  tokenExpired = false;
  emailPassed = false;

  resetPassForm: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private fb: FormBuilder,
    public auth: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {
    let {email, token} = this.route.snapshot?.queryParams;
    this.email = email;
    this.tokenExpired = this.jwtHelper.isTokenExpired(token);
    this.emailPassed = !!email;

    this.resetPassForm = this.fb.group({
      email: [this.email, [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['',
        [
          Validators.required, patternValidator(NO_SPACE_PATTERN),
          Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)
        ],
      ],
      confirm_password: ['', [Validators.required]]
    }, {validator: passwordConfirmation('password', 'confirm_password')});


  }

  ngOnInit(): void {

  }

  get pass(): AbstractControl {
    return this.resetPassForm.controls.password;
  }

  get confirmPass(): AbstractControl {
    return this.resetPassForm.controls.confirm_password;
  }

  changePassword() {
    this.isSubmitted = true;
    if (this.resetPassForm.valid) {
      this.auth.resetPass(this.resetPassForm.value).subscribe(async (dt: User) => {
        localStorage.setItem('token', dt.token || '');
        await this.router.navigate(['/']);
      });
    }
  }

  resendEmail() {
    this.auth.sendForgotPassEmail({email: this.email}).subscribe(dt => {
      this.toastr.success('Reset password request has been resent to your e-mail');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
