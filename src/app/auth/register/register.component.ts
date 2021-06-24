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
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';

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
  uploadFiles: File[] = [];


  constructor(
    private fb: FormBuilder,
    public router: Router,
    public auth: AuthService,
    private toastr: ToastrService,
    private buildFormData: BuildFormDataPipe
  ) {
    this.registrationForm = this.fb.group({
      first_name: ['Test', Validators.required],
      last_name: ['User', Validators.required],
      gender: ['male', Validators.required],
      avatar: [''],
      folder: ['users/avatars'],
      email: ['sofiabruno3003@gmail.com', [Validators.required, patternValidator(EMAIL_PATTERN)]],
      password: ['12345678', Validators.required],
    });


  }

  ngOnInit(): void {
  }

  sendVerificationCode() {
    this.isSubmitted = true;
    let formData: FormData = this.buildFormData.transform(this.registrationForm.value, this.uploadFiles, 'avatar_file');
    if (this.registrationForm.valid) {
      this.subscriptions.push(this.auth.sendVerificationCode(formData).subscribe(msg => {
        this.codeSent = true;
        this.toastr.success('The code has been sent to your e-mail')
      }));
    }
  }

  onAddedFile(file: File) {
    this.uploadFiles.push(file);
    this.registrationForm.patchValue({avatar: file.name});
  }

  removeImage() {
    this.uploadFiles = [];
    this.registrationForm.patchValue({avatar: ''});
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
