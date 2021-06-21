import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthGuard} from '@core/guards/auth.guard';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isSubmitted = false;
  codeVerified = false;
  codeReSent = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private toastr: ToastrService,
    private authGuard: AuthGuard
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((params: Data) => {
      this.verifyCode(params);
    })
  }


  verifyCode(params: Data): void {
    this.subscriptions.push(this.auth.verifyCode(params).subscribe(async (dt) => {
      this.codeVerified = true;
      localStorage.setItem('token', dt?.token || '');
      await this.router.navigateByUrl(this.authGuard.redirectUrl || '/');
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
