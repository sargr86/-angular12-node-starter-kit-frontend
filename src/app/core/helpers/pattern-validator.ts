import {AbstractControl, ValidatorFn, FormGroup} from '@angular/forms';

export function patternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    return !pattern.test(value) ? {patternInvalid: {pattern}} : null;
  };
}
