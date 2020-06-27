import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {DeviceDetectorService} from "ngx-device-detector";
import {TextBlockHelpModalComponent} from "../../modals/textBlockHelp/text-block-help-modal.component";
import {PageRepository} from "../../../../repository/PageRepository";
import {PositionChangeModalComponent} from "../../modals/changePosition/position-change-modal.component";
import {PositionMap} from "../../../../logic/PageComponent/PositionMap";
import {_switchPositionFlow} from "../../shared/_switchPositionFlow";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['./text-block.component.scss'],
  templateUrl: './text-block.component.html',
})
export class TextBlockComponent implements OnDestroy, OnInit {
  hovered: boolean = false;
  touched: boolean = false;
  expanded: boolean = true;
  internalName: string = '';
  comment: string = '';

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

  @ViewChild('editorComponent', {static: false}) editorComponent: CKEditorComponent;

  @Input('index') index: number;
  @Input('component') component: TextBlockModel;
  @Input('appContext') appContext: AppContext;
  @Output('positionChangeObserver') positionChangeObserver: EventEmitter<{uuid: string, nextPosition: number, currentPosition: number}> = new EventEmitter<{uuid: string, nextPosition: number, currentPosition: number}>()

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private deviceDetector: DeviceDetectorService,
    private positionMap: PositionMap,
  ) {}

  ngOnInit() {
    this.internalName = (this.component.internalName === '') ? 'click to view text' : this.component.internalName;
    this.comment = this.component.comment;
  }

  onHelp() {
    this.dialog.open(TextBlockHelpModalComponent, {
      width: '70%',
      data: {},
    });
  }

  componentTouched() {
    if (this.deviceDetector.isDesktop()) return;

    this.touched = true;
    this.hovered = true;
  }

  onExpandBlock() {
    this.expanded = true;
  }

  onCompressBlock() {
    this.expanded = false;
  }

  onSwitchPosition() {
    _switchPositionFlow.call(this);
  }

  addInternalName() {
    const data = {
      name: (this.internalName === 'click to view text') ? '' : this.internalName,
    };

    const dialogRef = this.dialog.open(AddInternalNameModalComponent, {
      width: '480px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((internalName: string) => {
      if (internalName === 'closed') return;
      if (typeof internalName === "undefined") return;

      const model = {
        blockUuid: this.component.blockUuid,
        text: this.component.text,
        internalName: internalName,
        comment: this.component.comment,
      };

      this.store.dispatch(httpUpdateTextBlock(model));

      this.internalName = internalName;
    });
  }

  addComment() {
    const dialogRef = this.dialog.open(AddCommentModalComponent, {
      width: '480px',
      data: {name: this.comment},
    });

    dialogRef.afterClosed().subscribe((comment: string) => {
      if (comment === 'closed') return;
      if (typeof comment === "undefined") return;

      const model = {
        blockUuid: this.component.blockUuid,
        position: this.component.position,
        text: this.component.text,
        internalName: this.internalName,
        comment: comment,
      };

      this.store.dispatch(httpUpdateTextBlock(model));

      this.comment = comment;
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
    if (this.touched) return;

    this.hovered = true;
  }

  componentUnHovered() {
    if (this.touched) return;
    this.hovered = false;
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
