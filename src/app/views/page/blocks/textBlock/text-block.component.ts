import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TextBlockModel} from "../../../../model/app/TextBlockModel";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['./text-block.component.scss'],
  templateUrl: './text-block.component.html',
})
export class TextBlockComponent implements OnDestroy {
  componentState = {
    hovered: false,
    updateWanted: false,
    expanded: false,
  };

  editor = ClassicEditor;

  icons = {
    'remove': 'fas fa-trash-alt',
  };

  editorConfig = {
    toolbar: [
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
      'redo',
    ]
  };

  // @ts-ignore
  @ViewChild('editorComponent') editorComponent: CKEditorComponent;

  @Input('index') index: number;
  @Input('component') component: TextBlockModel;

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
  ) {}

  onExpandBlock() {
    this.componentState.expanded = true;
  }

  onCompressBlock() {
    this.componentState.expanded = false;
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
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) this.store.dispatch(httpRemoveBlock(this.component));
    });

  }

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  onChange() {
    this.typeAheadSource.next();
  }

  ngOnDestroy(): void {
    if (this.typeAheadObservable) {
      this.typeAheadObservable.unsubscribe();
    }
  }
}
