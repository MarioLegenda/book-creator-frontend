import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateCodeBlock} from "../../../../store/page/httpActions";
import {CodeBlockModel} from "../../../../model/app/CodeBlockModel";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {AddGithubGistDialogComponent} from "../../modals/addGithubGist/add-github-gist-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {SelectEnvironmentDialog} from "../../modals/selectEnvironment/select-environment.component";
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";
import {PageContextInitializer} from "../../../../logic/PageComponent/context/PageContextInitializer";
import {LinkCodeProjectDialogComponent} from "../../modals/linkCodeProject/link-code-project.component";

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
    private emlRepository: EnvironmentEmulatorRepository,
    private pageContext: PageContextInitializer,
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
    blockErrors: null,
    emulator: null,
    hasTestRunWindow: false,
    testRunResult: null,
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
    this.componentState.emulator = this.component.emulator;

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
    this.componentState.blockErrors = null;

    if (this.componentState.code === '') {
      this.componentState.blockErrors = [];
      this.componentState.blockErrors.push('There is no code to run');

      return;
    }

    this.componentState.isCodeRunning = true;
    this.componentState.hasTestRunWindow = false;

    this.emlRepository.buildAndRunSingleFile(
      this.pageContext.getContext().page.shortId,
      this.component.shortId,
      this.componentState.code,
      this.componentState.emulator.name,
    ).subscribe((res) => {
      this.componentState.isCodeRunning = false;

      this.componentState.testRunResult = res;

      this.componentState.hasTestRunWindow = true;
    })
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

      this.componentState.hasTestRunWindow = false;
      this.componentState.testRunResult = null;

      if (this.componentState.isGist) {
        this.componentState.isGist = false;

        setTimeout(() => {
          this.componentState.gistData = gistData;
          this.componentState.isCode = false;
          this.componentState.isGist = true;
          this.componentState.readonly = true;

          this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
        }, 2000);
      } else {
        this.componentState.gistData = gistData;
        this.componentState.isCode = false;
        this.componentState.isGist = true;
        this.componentState.readonly = true;

        this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
      }
    });
  }

  onSelectEnvironment() {
    this.emlRepository.getEnvironments().subscribe(emulators => {
      this.handleEmulatorDialog(emulators);
    });
  }

  onClearGist() {
    this.componentState.isGist = false;
    this.componentState.isCode = true;
    this.componentState.gistData = null;
    this.componentState.readonly = false;

    this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
  }

  onSelectCodeProject() {
    const dialogRef = this.dialog.open(LinkCodeProjectDialogComponent, {
      width: '480px',
      data: {name: ''},
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  onTestRunWindowClose() {
    this.componentState.hasTestRunWindow = false;
    this.componentState.testRunResult = null;
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
      emulator: this.componentState.emulator,
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
        this.componentState.blockErrors = null;

        this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
      });
  }

  private handleEmulatorDialog(emulators) {
    const dialogRef = this.dialog.open(SelectEnvironmentDialog, {
      width: '480px',
      data: emulators,
    });

    dialogRef.afterClosed().subscribe((eml: any) => {
      if (!eml) return;

      this.componentState.emulator = eml;

      this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
    });
  }
}
