import {environment} from '@env';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

export const API_URL = environment.apiUrl;
export const PASSWORD_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 6;

export const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '{no_url}',
  maxFilesize: 50,
  maxFiles: 1,
  acceptedFiles: 'image/*',
  autoProcessQueue: false,
  addRemoveLinks: true
};
