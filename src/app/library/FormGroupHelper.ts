import {FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class FormGroupHelper {
  shouldBeDisabled(formGroup: FormGroup): boolean {
    return formGroup.status !== 'VALID';
  }

  isValid(formGroup: FormGroup): boolean {
    return formGroup.status === 'VALID';
  }
}
