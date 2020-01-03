import {Component, EventEmitter, Input, ViewChild} from '@angular/core';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog} from "@angular/material/dialog";
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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

  @Input('focusTrackerEvent') focusTrackerEvent: EventEmitter<string>;
  @Input('index') index: number;
  @Input('componentData') componentData: IComponent;

  private typeAheadSource = new BehaviorSubject([]);
  private typeAheadObservable = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.focusTrackerEvent.subscribe((index) => {
      if (this.index === index) {
        const model = this.createTextModel();

        this.store.dispatch(httpUpdateTextBlock(model));
      }
    });
  }

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();

    this.editorComponent.editorInstance.setData(this.componentData.value.text);

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = this.createTextModel();

        this.store.dispatch(httpUpdateTextBlock(model));
      });
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

  onChange() {
    this.typeAheadSource.next([]);
  }

  ngOnDestroy(): void {
    this.typeAheadObservable.unsubscribe();
  }

  private createTextModel(): any {
    const model: any = {};
    model.blockUuid = this.componentData.value.blockUuid;
    model.text = this.componentData.value.text;

    return model;
  }
}
