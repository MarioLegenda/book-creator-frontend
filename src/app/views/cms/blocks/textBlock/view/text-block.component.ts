import {AfterViewInit, Component, Input} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../../logic/pageComponent/IComponent";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['../../../../../web/styles/blocks/textBlock/text-block-view.component.scss'],
  templateUrl: '../../../../../web/templates/blocks/textBlock/view/text-block.component.html',
})
export class TextBlockComponent implements AfterViewInit {
  textBlockForm: FormGroup;

  componentState = {
    focused: false,
    updateWanted: false
  };

  Editor = BalloonEditor;
  @Input() componentData: IComponent;

  ngAfterViewInit(): void {
    this.textBlockForm = new FormGroup({
      internalName: new FormControl(this.componentData.value.internalName,{
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
      }),
      shortDescription: new FormControl(this.componentData.value.shortDescription),
    });
  }

  remove(internalName: string) {
  }

  onUpdateWanted() {
    this.componentState.updateWanted = !this.componentState.updateWanted;
  }

  onMouseEnter() {
    this.componentState.focused = true;
  }

  onMouseLeave() {
    this.componentState.focused = false;
  }
}
