import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {patternValidator} from '@core/helpers/pattern-validator';
import {EMAIL_PATTERN} from '@core/constants/patterns';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {DROPZONE_CONFIG, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {DEFAULT_DROPZONE_CONFIG} from '@core/constants/global';
import {DropzoneEvent} from 'ngx-dropzone-wrapper/lib/dropzone.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;

  subscriptions: Subscription[] = [];
  isSubmitted = false;

  codeSent = false;

  dropzoneConfig: DropzoneConfigInterface = DEFAULT_DROPZONE_CONFIG;
  dropzoneFiles: File[] = [];


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


  }

  ngOnInit(): void {
  }

  sendVerificationCode() {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      this.subscriptions.push(this.auth.sendVerificationCode(this.registrationForm.value).subscribe(msg => {
        this.codeSent = true;
        this.toastr.success('The code has been sent to your e-mail')
      }));
    }
  }

  // buildFormData(data){
  //   const fd: FormData = new FormData();
  //
  //   for (const field of Object.keys(data)) {
  //     fd.append(field, data[field] ? data[field] : '');
  //   }
  // }

  onAddedFile(file: File) {
    console.log(file)
    // this.dropzoneFiles.push(e[0]);
    // this.registrationForm.patchValue({avatar: e[0].name});
    // console.log(e)
  }

  removeImage() {

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
