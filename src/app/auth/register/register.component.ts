import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  verificationForm: FormGroup;
  subscriptions: Subscription[] = [];
  isSubmitted = false;
  codeVerified = false;
  codeSent = false;
  codeReSent = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public auth: AuthService,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.fb.group({
      first_name: ['Test', Validators.required],
      last_name: ['User', Validators.required],
      gender: [0, Validators.required],
      email: ['sofiabruno3003@gmail.com', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['', Validators.required],
    });

    this.verificationForm = this.fb.group({
      token: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  sendVerificationCode(resend = false) {
    this.subscriptions.push(this.auth.sendVerificationCode(this.registrationForm.value).subscribe(msg => {
      this.codeSent = true;
      if (resend) {
        this.codeReSent = true;
        this.toastr.success('The code has been resent to your e-mail')
      } else {
        this.toastr.success('The code has been sent to your e-mail')
      }
    }));
  }

  verifyCode(): void {
    this.subscriptions.push(this.auth.verifyCode({...this.registrationForm.value, ...this.verificationForm.value}).subscribe(dt => {
      this.codeVerified = true;
      this.toastr.success('The code verified successfully');
    }));
  }


  get firstName(): AbstractControl {
    return this.registrationForm.controls.first_name;
  }

  get lastName(): AbstractControl {
    return this.registrationForm.controls.last_name;
  }

  get email(): AbstractControl {
    return this.registrationForm.controls.email;
  }

  get pass(): AbstractControl {
    return this.registrationForm.controls.password;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
