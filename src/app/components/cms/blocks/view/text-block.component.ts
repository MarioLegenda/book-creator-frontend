import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {textBlockCreated, textBlockMenuClicked} from '../../../../store/actions';

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['../../scss/blocks/text-block.component.scss'],
  templateUrl: '../../html/blocks/create/text-block.component.html',
})
export class TextBlockComponent {
  constructor(private store: Store<any>) {}
}
