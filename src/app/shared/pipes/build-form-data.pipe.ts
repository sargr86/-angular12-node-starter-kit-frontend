import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

  transform(data: any, files: File[], fileKey: string): FormData {
    const fd: FormData = new FormData();

    // For regular  form fields
    for (const field of Object.keys(data)) {
      fd.append(field, data[field] || '');
    }

    // If file(s) field(s) present
    if (files?.length > 0) {
      files.map(file => {
        fd.append(fileKey, file);
      });
    }

    return fd;
  }

}
