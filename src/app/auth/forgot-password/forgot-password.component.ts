import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {patternValidator} from '@core/helpers/pattern-validator';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private toastr: ToastrService
  ) {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, patternValidator(EMAIL_PATTERN)]]
    });
  }

  ngOnInit(): void {
  }

  sendEmail() {
    this.isSubmitted = true;
    if (this.forgotPassForm.valid) {
      this.auth.sendForgotPassEmail(this.forgotPassForm.value).subscribe(dt => {
        this.toastr.success('Reset password request has been sent to your e-mail');
      });
    }
  }

  get emailCtrl() {
    return this.forgotPassForm.controls.email;
  }

}
