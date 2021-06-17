import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  subscriptions: Subscription[] = [];
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) {
    this.registrationForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register(): void {

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
