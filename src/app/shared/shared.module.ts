import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@core/modules/material.module';
import {DROPZONE_CONFIG, DropzoneModule} from 'ngx-dropzone-wrapper';
import {DEFAULT_DROPZONE_CONFIG} from '@core/constants/global';
import { BuildFormDataPipe } from './pipes/build-form-data.pipe';

@NgModule({
  declarations: [
    BuildFormDataPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DropzoneModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DropzoneModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    BuildFormDataPipe
  ]
})
export class SharedModule {
}
