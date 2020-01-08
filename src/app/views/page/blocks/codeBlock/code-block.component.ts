import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateCodeBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import {CodeBlockModel} from "../../../../model/app/CodeBlockModel";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {AddGithubGistDialogComponent} from "../../modals/addGithubGist/add-github-gist-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";

@Component({
  selector: 'cms-code-block',
  styleUrls: [
    './code-block.component.scss'
  ],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
  ) {}

  icons = {
    'remove': 'fas fa-trash-alt',
  };

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;
  private onDroppedObservable = null;

  componentState = {
    hovered: false,
    readonly: false,
    gistData: null,
    isGist: false,
    hasTestRunWindow: true,
    isCode: true,
    isCodeRunning: false,
    editorOptions: {
      theme: 'vs-light',
      language: 'javascript',
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      }
    },
    code: '',
  };

  @Input('index') index: number;
  @Input('component') component: CodeBlockModel;
  @Input('componentDropped') componentDropped: Subject<any>;

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  remove() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) this.store.dispatch(httpRemoveTextBlock(this.component));
    });
  }

  ngOnInit() {
    this.componentState.code = this.component.text;
    this.componentState.readonly = this.component.readOnly;
    this.componentState.isGist = this.component.isGist;
    this.componentState.isCode = this.component.isCode;
    this.componentState.gistData = this.component.gistData;

    this.subscribeTypeahead();
    this.subscribeDroppedForGist();
  }

  ngOnDestroy(): void {
    if (this.typeAheadObservable) {
      this.typeAheadObservable.unsubscribe();
    }

    if (this.onDroppedObservable) {
      this.onDroppedObservable.unsubscribe();
    }
  }

  onCodeChange() {
    this.typeAheadSource.next();
  }

  onRunCode() {
    this.componentState.isCodeRunning = true;

    setTimeout(() => this.componentState.isCodeRunning = false, 3000);
  }

  onReadonlyChange() {
    if (this.componentState.isGist) return;

    this.componentState.readonly = !this.componentState.readonly;

    this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
  }

  onRefresh() {
    if (this.componentState.isGist) {
      this.componentState.isGist = false;

      setTimeout(() => this.componentState.isGist = true, 2000);

      return;
    }
  }

  onGithubGist() {
    const dialogRef = this.dialog.open(AddGithubGistDialogComponent, {
      width: '480px',
      data: {name: ''},
    });

    dialogRef.afterClosed().subscribe((gistData: string) => {
      if (!gistData) return;

      this.componentState.gistData = gistData;
      this.componentState.isCode = false;
      this.componentState.isGist = true;
      this.componentState.readonly = true;

      this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
    });
  }

  onTestRunWindowClose() {
    this.componentState.hasTestRunWindow = false;
  }

  private createUpdateModel() {
    return {
      blockUuid: this.component.blockUuid,
      position: this.component.position,
      text: this.componentState.code,
      gistData: this.componentState.gistData,
      isGist: this.componentState.isGist,
      isCode: this.componentState.isCode,
      readonly: this.componentState.readonly,
    };
  }

  private subscribeDroppedForGist() {
    this.onDroppedObservable = this.componentDropped.subscribe((blockUuid: string) => {
      if (blockUuid === this.component.blockUuid) {
        if (!this.componentState.isGist) return;

        this.componentState.isGist = false;

        setTimeout(() => {
          this.componentState.isGist = true;
        }, 2000);
      }
    });
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        this.store.dispatch(httpUpdateTextBlock(this.createUpdateModel()));
      });
  }
}
