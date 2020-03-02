import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveBlock, httpUpdateCodeBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
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
  @Input('source') source: any;

  ngOnInit() {
    this.componentState.code = this.component.text;
    this.componentState.readonly = this.component.readOnly;
    this.componentState.isGist = this.component.isGist;
    this.componentState.isCode = this.component.isCode;
    this.componentState.gistData = this.component.gistData;
    this.componentState.emulator = this.component.emulator;
    this.componentState.internalName = this.component.internalName;
    this.componentState.comment = this.component.comment;

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
      if (confirm === true) {
        if (this.componentState.codeProjectImported) {
          this.removeCodeProject().subscribe(() => {
            this.store.dispatch(httpRemoveBlock(this.component));
          });
        } else {
          this.store.dispatch(httpRemoveBlock(this.component));
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
      const sourceId: string = this.source.uuid;

      this.blogRepository.linkCodeProject(HttpModel.createLinkCodeProject(
        codeProjectUuid,
        pageUuid,
        sourceId,
        blockUuid,
      )).subscribe(() => {
        this.importCodeProject(codeProjectUuid);
      });
    });
  }

  onRemoveCodeProject() {
    this.removeCodeProject().subscribe(() => {
      this.componentState.codeProjectImported = false;
      this.componentState.codeProject = null;
    });
  }

  onTestRunWindowClose() {
    this.componentState.hasTestRunWindow = false;
    this.componentState.testRunResult = null;
  }

  onOpenDirectoryStructure() {
    const dialogRef = this.dialog.open(OpenDirectoryStructureDialogComponent, {
      width: '480px',
      height: '500px',
      data: {codeProjectUuid: this.componentState.codeProject.uuid},
    });

    dialogRef.afterClosed().subscribe(() => {
    });
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
          const sourceId: string = this.source.uuid;

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
    const sourceId: string = this.source.uuid;

    const model: any = HttpModel.unLinkCodeProject(
      this.componentState.codeProject.uuid,
      pageUuid,
      sourceId,
      blockUuid
    );

    return this.blogRepository.unLinkCodeProject(model);
  }

  private runCodeProjectFlow() {
    this.componentState.blockErrors = null;

    if (this.componentState.code === '') {
      this.componentState.blockErrors = [];
      this.componentState.blockErrors.push('There is no code to run');

      return;
    }

    this.componentState.isCodeRunning = true;
    this.componentState.hasTestRunWindow = false;

    if (this.componentState.codeProjectImported) {
      const model = HttpModel.buildAndRunProject(
        this.componentState.code,
        'dev',
      );

      this.emlRepository.BuildAndRunProject(this.componentState.codeProject.uuid, model).subscribe((res) => {
        this.componentState.isCodeRunning = false;

        this.componentState.testRunResult = res;

        this.componentState.hasTestRunWindow = true;
      });
    } else {
      const model = HttpModel.buildAndRunSingleFile(
        this.pageContext.getContext().page.shortId,
        this.component.shortId,
        this.componentState.code,
        this.componentState.emulator.name,
        'single_file',
      );

      this.emlRepository.buildAndRunSingleFile(model).subscribe((res) => {
        this.componentState.isCodeRunning = false;

        this.componentState.testRunResult = res;

        this.componentState.hasTestRunWindow = true;
      });
    }
  }

  private importCodeProject(uuid: string) {
    this.codeProjectsRepository.getSingleProject(uuid).subscribe((res) => {
      this.componentState.codeProjectImported = true;

      this.componentState.codeProject = res;
    });
  }
}
