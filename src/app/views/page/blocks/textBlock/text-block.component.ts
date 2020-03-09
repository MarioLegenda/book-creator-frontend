import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import * as BaloonEditor from "@ckeditor/ckeditor5-build-balloon";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TextBlockModel} from "../../../../model/app/TextBlockModel";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {AddInternalNameModalComponent} from "../../modals/addInternalName/add-internal-name-modal.component";
import {AddCommentModalComponent} from "../../modals/addComment/add-comment-modal.component";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['./text-block.component.scss'],
  templateUrl: './text-block.component.html',
})
export class TextBlockComponent implements OnDestroy, OnInit {
  componentState = {
    hovered: false,
    updateWanted: false,
    expanded: true,
    internalName: '',
    comment: '',
  };

  editor = BaloonEditor;

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
      'code',
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
  @Input('appContext') appContext: AppContext;

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.componentState.internalName = (this.component.internalName === '') ? 'click to view text' : this.component.internalName;
    this.componentState.comment = this.component.comment;
  }

  onExpandBlock() {
    this.componentState.expanded = true;
  }

  onCompressBlock() {
    this.componentState.expanded = false;
  }

  addInternalName() {
    const data = {
      name: (this.componentState.internalName === 'click to view text') ? '' : this.componentState.internalName,
    };

    const dialogRef = this.dialog.open(AddInternalNameModalComponent, {
      width: '480px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((internalName: string) => {
      if (internalName === null) return;

      const model = {
        blockUuid: this.component.blockUuid,
        position: this.component.position,
        text: this.component.text,
        internalName: internalName,
        comment: this.component.comment,
      };

      this.store.dispatch(httpUpdateTextBlock(model));

      this.componentState.internalName = internalName;
    });
  }

  addComment() {
    const dialogRef = this.dialog.open(AddCommentModalComponent, {
      width: '480px',
      data: {name: this.componentState.comment},
    });

    dialogRef.afterClosed().subscribe((comment: string) => {
      if (comment === null) return;

      const model = {
        blockUuid: this.component.blockUuid,
        position: this.component.position,
        text: this.component.text,
        internalName: this.componentState.internalName,
        comment: comment,
      };

      this.store.dispatch(httpUpdateTextBlock(model));

      this.componentState.comment = comment;
    });
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
          internalName: this.component.internalName,
          comment: this.component.comment,
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
