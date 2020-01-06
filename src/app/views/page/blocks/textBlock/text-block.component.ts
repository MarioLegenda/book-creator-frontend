import {Component, Input, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog} from "@angular/material/dialog";
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {TextBlockModel} from "../../../../model/app/TextBlockModel";
import {HttpModel} from "../../../../model/http/HttpModel";

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

  editor = ClassicEditor;

  icons = {
    'remove': 'fas fa-trash-alt',
  };

  editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'undo',
      'redo'
    ]
  };

  // @ts-ignore
  @ViewChild('editorComponent') editorComponent: CKEditorComponent;

  @Input('index') index: number;
  @Input('component') component: TextBlockModel;

  private typeAheadSource = new BehaviorSubject([]);
  private typeAheadObservable = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
  ) {}

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();

    this.editorComponent.editorInstance.setData(this.component.text);

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = {
          blockUuid: this.component.blockUuid,
          position: this.component.position,
          text: this.component.text,
        };

        this.store.dispatch(httpUpdateTextBlock(model));
      });
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.component));
  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  onChange() {
    this.typeAheadSource.next([]);
  }

  ngOnDestroy(): void {
    if (this.typeAheadObservable) {
      this.typeAheadObservable.unsubscribe();

      this.typeAheadObservable = null;
    }
  }
}
