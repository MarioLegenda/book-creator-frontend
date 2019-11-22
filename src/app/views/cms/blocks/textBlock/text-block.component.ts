import {Component, EventEmitter, Input, ViewChild} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateTextBlock} from "../../../../store/httpActions";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['./text-block.component.scss'],
  templateUrl: './text-block.component.html',
})
export class TextBlockComponent {
  componentState = {
    hovered: false,
    updateWanted: false,
  };

  editorCreated = false;

  editor = BalloonEditor;

  // @ts-ignore
  @ViewChild('editorComponent') editorComponent: CKEditorComponent;

  @Input('focusTrackerEvent') focusTrackerEvent: EventEmitter<string>;
  @Input('index') index: number;
  @Input('componentData') componentData: IComponent;

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.focusTrackerEvent.subscribe((index) => {
      if (this.index === index) {
        const model = this.createTextModel();

        this.store.dispatch(httpUpdateTextBlock(model));

        this.editorCreated = false;
      }
    })
  }

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();

    this.editorComponent.editorInstance.setData(this.componentData.value.text);
  }

  saveText() {
    const model = this.createTextModel();

    this.store.dispatch(httpUpdateTextBlock(model));
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.componentData));
  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  private createTextModel(): any {
    const model: any = {};
    model.blockUuid = this.componentData.value.blockUuid;
    model.text = this.componentData.value.text;

    return model;
  }
}
