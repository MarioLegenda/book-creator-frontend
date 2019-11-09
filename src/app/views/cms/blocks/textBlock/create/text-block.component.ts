import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {textBlockCreated, textBlockMenuClicked} from '../../../../../store/actions';
import {ComponentType} from "../../../../../logic/pageComponent/ComponentType";
import {ComponentTracker} from "../../../../../logic/pageComponent/ComponentTracker";

@Component({
  selector: 'cms-create-text-block',
  styleUrls: ['../../../../../web/styles/blocks/textBlock/text-block-create.component.scss'],
  templateUrl: '../../../../../web/templates/blocks/textBlock/create/text-block.component.html',
})
export class TextBlockComponent {
  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker,
  ) {}

  textBlockForm = new FormGroup({
    internalName: new FormControl('',{
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255), (control: AbstractControl) => {
        if (this.componentTracker.has(control.value)) {
          return {internalNameUnique: true};
        }

        return null;
      }]
    }),
    shortDescription: new FormControl(''),
  });

  onSubmit() {
    this.store.dispatch(textBlockMenuClicked());
    this.store.dispatch(textBlockCreated({
      ...this.textBlockForm.value,
      ...{componentType: ComponentType.TEXT_BLOCK_TYPE}
    }));
  }
}
