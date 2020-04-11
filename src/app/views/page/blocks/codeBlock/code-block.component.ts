import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  httpRemoveBlock,
  httpUpdateCodeBlock,
} from "../../../../store/page/httpActions";
import {CodeBlockModel} from "../../../../model/app/CodeBlockModel";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {AddGithubGistDialogComponent} from "../../modals/addGithubGist/add-github-gist-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {SelectEnvironmentDialog} from "../../modals/selectEnvironment/select-environment.component";
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";
import {AppContextInitializer} from "../../../../logic/PageComponent/context/AppContextInitializer";
import {ImportCodeProjectDialogComponent} from "../../modals/importCodeProject/import-code-project.component";
import {NewCodeProjectDialogComponent} from "../../../shared/modules/newCodeProjectModal/newCodeProject/new-code-project.component";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {OpenDirectoryStructureDialogComponent} from "../../modals/openDirectoryStructure/open-directory-structure.component";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {changeState} from "../../../../logic/utilFns";

@Component({
  selector: 'cms-code-block',
  styleUrls: [
    './code-block.component.scss',
  ],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private emlRepository: EnvironmentEmulatorRepository,
    private pageContext: AppContextInitializer,
    private codeProjectsRepository: CodeProjectsRepository,
    private blogRepository: BlogRepository,
  ) {}

  hovered: boolean = false;
  readonly: boolean = false;
  gistData = null;
  isGist: boolean = false;
  blockErrors = null;
  emulator = null;
  internalName: string;
  comment: string;
  hasTestRunWindow: boolean = false;
  testRunResult = null;
  codeProjectImported: boolean = false;
  codeProject = null;
  isCode: boolean = true;
  saved: boolean = false;
  isCodeRunning: boolean = false;

  code: string = '';

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
    internalName: '',
    comment: '',
    hasTestRunWindow: false,
    testRunResult: null,
    codeProjectImported: false,
    codeProject: null,
    isCode: true,
    saved: false,
    isCodeRunning: false,

    code: '',
  };

  editorOptions: {
    theme: 'vs-light',
    language: 'javascript',
    codeLens: false,
    formatOnPaste: true,
    minimap: {
      enabled: false,
    }
  };

  @Input('index') index: number;
  @Input('component') component: CodeBlockModel;
  @Input('componentDropped') componentDropped: Subject<any>;
  @Input('appContext') appContext: AppContext;

  ngOnInit() {
    this.code = this.component.text;
    this.readonly = this.component.readOnly;
    this.isGist = this.component.isGist;
    this.isCode = this.component.isCode;
    this.gistData = this.component.gistData;
    this.emulator = this.component.emulator;
    this.internalName = this.component.internalName;
    this.comment = this.component.comment;

    if (this.component.codeProjectUuid) {
      this.importCodeProject(this.component.codeProjectUuid);
    }

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

  componentHovered() {
    this.hovered = true;
  }

  componentUnHovered() {
    this.hovered = false;
  }

  remove() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) {
        if (this.codeProjectImported) {
          this.removeCodeProject().subscribe(() => {
            this.store.dispatch(httpRemoveBlock(this.component));
            changeState(this.appContext, this.store);
          });
        } else {
          this.store.dispatch(httpRemoveBlock(this.component));
          changeState(this.appContext, this.store);
        }
      }
    });
  }

  onCodeChange() {
    this.typeAheadSource.next();
  }

  onRunCode() {
    this.runCodeProjectFlow();
  }

  onReadonlyChange() {
    if (this.isGist) return;

    this.readonly = !this.readonly;

    this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
  }

  onRefresh() {
    if (this.isGist) {
      this.isGist = false;

      setTimeout(() => this.isGist = true, 2000);

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

      this.hasTestRunWindow = false;
      this.testRunResult = null;

      if (this.isGist) {
        this.isGist = false;

        setTimeout(() => {
          this.gistData = gistData;
          this.isCode = false;
          this.isGist = true;
          this.readonly = true;

          this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
        }, 2000);
      } else {
        this.gistData = gistData;
        this.isCode = false;
        this.isGist = true;
        this.readonly = true;

        this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
      }
    });
  }

  onSelectEnvironment() {
    if (this.codeProjectImported) return;

    this.emlRepository.getEnvironments().subscribe(emulators => {
      this.handleEmulatorDialog(emulators);
    });
  }

  onClearGist() {
    this.isGist = false;
    this.isCode = true;
    this.gistData = null;
    this.readonly = false;

    this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
  }

  onImportCodeProject() {
    const dialogRef = this.dialog.open(ImportCodeProjectDialogComponent, {
      width: '480px',
      height: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((action) => {
      if (!action) return;

      if (action === 'newCodeProject') {
        return this.newCodeProjectFlow();
      }

      const codeProjectUuid: string = action.uuid;
      const blockUuid: string = this.component.blockUuid;
      const pageUuid: string = this.pageContext.getContext().page.uuid;
      const sourceId: string = this.appContext.knowledgeSource.uuid;

      this.blogRepository.linkCodeProject(HttpModel.createLinkCodeProject(
        codeProjectUuid,
        pageUuid,
        sourceId,
        blockUuid,
      )).subscribe(() => {
        this.importCodeProject(codeProjectUuid);

        changeState(this.appContext, this.store);
      });
    });
  }

  onRemoveCodeProject() {
    this.removeCodeProject().subscribe(() => {
      this.codeProjectImported = false;
      this.codeProject = null;
      this.emulator = null;

      changeState(this.appContext, this.store);
    });
  }

  onTestRunWindowClose() {
    this.hasTestRunWindow = false;
    this.testRunResult = null;
  }

  onOpenDirectoryStructure() {
    const dialogRef = this.dialog.open(OpenDirectoryStructureDialogComponent, {
      width: '480px',
      height: '500px',
      data: {codeProjectUuid: this.codeProject.uuid},
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private createUpdateModel() {
    return {
      blockUuid: this.component.blockUuid,
      position: this.component.position,
      text: this.code,
      gistData: this.gistData,
      isGist: this.isGist,
      isCode: this.isCode,
      readonly: this.readonly,
      emulator: this.emulator,
    };
  }

  private subscribeDroppedForGist() {
    this.onDroppedObservable = this.componentDropped.subscribe((blockUuid: string) => {
      if (blockUuid === this.component.blockUuid) {
        if (!this.isGist) return;

        this.isGist = false;

        setTimeout(() => {
          this.isGist = true;
        }, 2000);
      }
    });
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        this.blockErrors = null;

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

      this.emulator = eml;

      this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
      changeState(this.appContext, this.store);
    });
  }

  private newCodeProjectFlow() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(NewCodeProjectDialogComponent, {
        width: '480px',
        data: {
          name: '',
          description: '',
          info: 'This code project will automatically be imported into this knowledge source',
        },
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (!data) return;

        this.codeProjectsRepository.createCodeProject(HttpModel.createCodeProject(
          data.name,
          data.description,
          data.environment,
        )).subscribe((codeProject: any) => {
          const codeProjectUuid: string = codeProject.uuid;
          const blockUuid: string = this.component.blockUuid;
          const pageUuid: string = this.pageContext.getContext().page.uuid;
          const sourceId: string = this.appContext.knowledgeSource.uuid;

          this.blogRepository.linkCodeProject(HttpModel.createLinkCodeProject(
            codeProjectUuid,
            pageUuid,
            sourceId,
            blockUuid,
          )).subscribe(() => {
            this.importCodeProject(codeProjectUuid);
          });
        })
      });
    }, 500);
  }

  private removeCodeProject() {
    const blockUuid: string = this.component.blockUuid;
    const pageUuid: string = this.pageContext.getContext().page.uuid;
    const sourceId: string = this.appContext.knowledgeSource.uuid;

    const model: any = HttpModel.unLinkCodeProject(
      this.codeProject.uuid,
      pageUuid,
      sourceId,
      blockUuid
    );

    return this.blogRepository.unLinkCodeProject(model);
  }

  private runCodeProjectFlow() {
    this.blockErrors = null;

    if (this.code === '') {
      this.blockErrors = [];
      this.blockErrors.push('There is no code to run');

      return;
    }

    this.isCodeRunning = true;
    this.hasTestRunWindow = false;

    if (this.codeProjectImported) {
      const model = HttpModel.buildAndRunProject(
        this.code,
        'dev',
      );

      this.emlRepository.BuildAndRunProject(this.codeProject.uuid, model).subscribe((res) => {
        this.isCodeRunning = false;

        this.testRunResult = res;

        this.hasTestRunWindow = true;
      });
    } else {
      const model = HttpModel.buildAndRunSingleFile(
        this.appContext.knowledgeSource.uuid,
        this.component.blockUuid,
        this.code,
        this.emulator.name,
        'single_file',
      );

      this.emlRepository.buildAndRunSingleFile(model).subscribe((res) => {
        this.isCodeRunning = false;

        this.testRunResult = res;

        this.hasTestRunWindow = true;
      });
    }
  }

  private importCodeProject(uuid: string) {
    this.codeProjectsRepository.getSingleProject(uuid).subscribe((res) => {
      this.codeProjectImported = true;

      this.emulator = res.environment;
      this.codeProject = res;

      this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));

      this.isCode = false;

      setTimeout(() => {
        this.editorOptions.language = this.emulator.language;
        this.isCode = true;
      }, 1000);
    });
  }
}
