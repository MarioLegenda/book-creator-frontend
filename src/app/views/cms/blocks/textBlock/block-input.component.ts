import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpUpdateTextBlock} from "../../../../store/httpActions";

@Component({
  selector: 'cms-block-input',
  styleUrls: [
    '../../../../web/styles/blocks/block-input.component.scss',
    '../../../../web/styles/blocks/metadata-action.component.scss',
  ],
  templateUrl: '../../../../web/templates/cms/blocks/textBlock/block-input.component.html',
})
export class BlockInputComponent {
  toggleInputField: boolean;

  @Input('value') value: string;
  @Input('label') label: string;
  @Input('initialText') initialText: string;
  @Input('type') type: string;
  @Input('blockUuid') blockUuid: string;

  constructor(
    private store: Store<any>
  ) {}

  showInputField() {
    this.toggleInputField = true;
  }

  hideInputField() {
    this.toggleInputField = false;
  }

  onBlur() {
    const model: any = {};
    model.blockUuid = this.blockUuid;

    if (this.type === 'internal-name') model.internalName = this.value;
    if (this.type === 'short-description') model.shortDescription = this.value;

    this.store.dispatch(httpUpdateTextBlock(model));

    this.hideInputField();
  }
}
