import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {textBlockCreated, textBlockMenuClicked} from '../../../../store/actions';

@Component({
  selector: 'cms-create-text-block',
  styleUrls: ['../../scss/blocks/text-block.component.scss'],
  templateUrl: '../../html/blocks/create/text-block.component.html',
})
export class TextBlockComponent {
  constructor(private store: Store<any>) {}

  textBlockForm = new FormGroup({
    internalName: new FormControl('',{
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    }),
    shortDescription: new FormControl(''),
  });

  onSubmit() {
    this.store.dispatch(textBlockMenuClicked());
    this.store.dispatch(textBlockCreated(this.textBlockForm.value));
  }
}
