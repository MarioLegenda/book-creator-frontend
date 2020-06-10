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
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {changeState} from "../../../../logic/utilFns";
import {DeviceDetectorService} from "ngx-device-detector";
import {ErrorCodes} from "../../../../error/ErrorCodes";
import {CodeBlockHelpModalComponent} from "../../modals/codeBlockHelp/code-block-help-modal.component";

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
    private deviceDetector: DeviceDetectorService,
  ) {}

  hovered: boolean = false;
  touched: boolean = false;
  readonly: boolean = false;
  gistData = null;
  isGist: boolean = false;
  blockErrors = [];
  emulator = null;
  internalName: string;
  comment: string;
  hasTestRunWindow: boolean = false;
  testRunResult = null;
  codeProjectImported: boolean = false;
  codeProject = null;
  isCode: boolean = true;
  isCodeRunning: boolean = false;

  code: string = '';

  editorOptions = null;

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;
  private onDroppedObservable = null;
  private previousCode: string = null;

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
      this.importCodeProject(this.component.codeProjectUuid, false);
    }

    this.subscribeTypeahead();
    this.subscribeDroppedForGist();
    this.loadEditorOptions();
  }

  ngOnDestroy(): void {
    if (this.typeAheadObservable) {
      this.typeAheadObservable.unsubscribe();
    }

    if (this.onDroppedObservable) {
      this.onDroppedObservable.unsubscribe();
    }
  }

  onHelp() {
    this.dialog.open(CodeBlockHelpModalComponent, {
      width: '70%',
      data: {},
    });
  }

  componentTouched() {
    if (this.deviceDetector.isDesktop()) return;

    this.touched = true;
    this.hovered = true;
  }

  componentHovered() {
    if (this.touched) return;

    this.hovered = true;
  }

  componentUnHovered() {
    if (this.touched) return;

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

    changeState(this.appContext, this.store);
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

      changeState(this.appContext, this.store);
    });
  }

  onSelectEnvironment() {
    if (this.codeProjectImported) return;

    this.emlRepository.getEnvironments().subscribe(emulators => {
      this.handleEmulatorDialog(emulators);

      changeState(this.appContext, this.store);
    });
  }

  onClearGist() {
    this.isGist = false;
    this.isCode = true;
    this.gistData = null;
    this.readonly = false;

    this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));

    changeState(this.appContext, this.store);
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

      this.blockErrors = [];

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
      }, (e) => {
        if (!e.error) {
          return this.blockErrors.push('Something went wrong while importing your code project. Please, try again later.');
        }

        const response = e.error;

        if (response.errorCode === ErrorCodes.MaxCodeProjects) {
          return this.blockErrors.push('Maximum number of code projects imported. You can import only 3 different code projects in a blog but you can import the same code project as many times you want.');
        }
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
        this.blockErrors = [];

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
      this.loadEditorOptions();
    });
  }

  private newCodeProjectFlow() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(NewCodeProjectDialogComponent, {
        width: '480px',
        data: {
          name: '',
          description: '',
          title: 'New code project',
          info: 'This code project will automatically be imported into this knowledge source',
          buttonText: 'Create',
          doHttpAction: true,
        },
      });

      dialogRef.afterClosed().subscribe((codeProject) => {
        if (!codeProject) return;

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

          changeState(this.appContext, this.store);
        });
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
    this.blockErrors = [];

    // this line is never executed but will remain here as a reminder
    // that one can push errors and those errors will be shown to the user
    if (this.code === '') {
      this.blockErrors = [];
      this.blockErrors.push('There is no code to run');

      return;
    }

    if (this.code === this.previousCode) {
      this.testRunResult = null;
      this.hasTestRunWindow = false;
      this.blockErrors = [];
      this.blockErrors.push('Code is unchanged');

      return;
    }

    this.previousCode = this.code;

    this.isCodeRunning = true;
    this.hasTestRunWindow = false;

    if (this.codeProjectImported) {
      const model = HttpModel.buildAndRunProject(
        this.code,
        'dev',
      );

      const defaultTimeout: string = this.codeProject.environment.defaultTimeout + '';
      const timeout = parseInt(`${defaultTimeout[0]}${defaultTimeout[1]}`) * 1000 + 2000;

      this.emlRepository.BuildAndRunProject(this.codeProject.uuid, model, timeout).subscribe((res) => {
        this.isCodeRunning = false;

        this.testRunResult = res;

        this.hasTestRunWindow = true;
      }, (e) => {
        this.blockErrors = [];
        this.isCodeRunning = false;
        this.testRunResult = null;
        this.hasTestRunWindow = false;

        const defaultTimeout: string = this.codeProject.environment.defaultTimeout + '';
        const timeout = parseInt(`${defaultTimeout[0]}${defaultTimeout[1]}`);

        if (e.name && e.name === 'TimeoutError') {
          this.blockErrors.push(`Executing code timed out. Current timeout is ${timeout} seconds.`)
        } else {
          this.blockErrors.push('An unexpected error occurred while executing your code. Please, try again later.');
        }
      });
    } else {
      const model = HttpModel.buildAndRunSingleFile(
        this.appContext.knowledgeSource.uuid,
        this.component.blockUuid,
        this.code,
        this.emulator.name,
        'single_file',
      );

      const defaultTimeout: string = this.emulator.defaultTimeout + '';
      const timeout = parseInt(`${defaultTimeout[0]}${defaultTimeout[1]}`) * 1000 + 2000;

      this.emlRepository.buildAndRunSingleFile(model, timeout).subscribe((res) => {
        this.isCodeRunning = false;

        this.testRunResult = res;

        this.hasTestRunWindow = true;
      }, (e) => {
        this.blockErrors = [];
        this.isCodeRunning = false;
        this.testRunResult = null;
        this.hasTestRunWindow = false;

        const defaultTimeout: string = this.emulator.defaultTimeout + '';
        const timeout = parseInt(`${defaultTimeout[0]}${defaultTimeout[1]}`);

        if (e.name && e.name === 'TimeoutError') {
          this.blockErrors.push(`Executing code timed out. Current timeout is ${timeout} seconds.`)
        } else {
          this.blockErrors.push('An unexpected error occurred while executing your code. Please, try again later.');
        }
      });
    }
  }

  private importCodeProject(uuid: string, withBlockUpdate: boolean = true) {
    this.codeProjectsRepository.getSingleProject(uuid).subscribe((res) => {
      this.codeProjectImported = true;

      this.emulator = res.environment;
      this.codeProject = res;

      if (withBlockUpdate) {
        this.store.dispatch(httpUpdateCodeBlock(this.createUpdateModel()));
      }

      this.isCode = false;

      setTimeout(() => {
        this.editorOptions.language = this.emulator.language;
        this.isCode = true;
      }, 1000);
    });
  }

  private loadEditorOptions(): void {
    this.editorOptions = null;

    setTimeout(() => {
      const options = {
        theme: 'vs-light',
        language: 'javascript',
        codeLens: false,
        formatOnPaste: true,
        minimap: {
          enabled: false,
        },
      };

      if (this.emulator) {
        options.language = this.emulator.language;
      }

      this.editorOptions = options;

      if (this.emulator.name === "go" && !this.code) {
        this.code = `package main

func main() {
}
`;
      }

      if (this.emulator.name === "rust" && !this.code) {
        this.code = `fn main() {
}`;
      }
    }, 1000);
  }
}
