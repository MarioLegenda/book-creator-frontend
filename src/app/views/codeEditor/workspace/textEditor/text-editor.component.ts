import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, ReplaySubject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {FileRepository} from "../../../../repository/FileRepository";
import {FileTab} from "../../../../model/app/codeEditor/FileTab";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-text-editor',
  styleUrls: [
    './text-editor.component.scss',
  ],
  templateUrl: './text-editor.component.html',
})
export class TextEditorComponent implements AfterViewInit, OnDestroy {
  @Input('hasTabs') hasTabs: boolean;
  @Input('tab') tab: FileTab;
  @Input('contentLoadedEvent') contentLoadedEvent;
  @Input('project') project: any;

  // @ts-ignore
  @ViewChild('wrapperRef', {static: true}) wrapperRef: ElementRef;

  private typeAheadSource = new ReplaySubject<string>();
  private typeAheadObservable = null;
  private contentLoadedSubscription: Subscription;
  private editorViewActionUns;

  editorOptions = null;
  code: string = '';

  constructor(
    private store: Store<any>,
    private fileRepository: FileRepository,
  ) {}

  ngOnInit() {
    const editorOptions = {
      theme: 'vs-dark',
      language: this.project.environment.language,
      codeLens: false,
      formatOnPaste: true,
      acceptSuggestionOnEnter: 'off',
      links: false,
      showUnused: true,
      snippetSuggestions: false,
      contextmenu: false,
      copyWithSyntaxHighlighting: false,
      minimap: {
        enabled: false,
      },
    };

    this.editorOptions = editorOptions;

    this.editorViewActionUns = this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        this.code = action.content;
      }
    });

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = HttpModel.updateFileContentModel(
          this.project.uuid,
          this.tab.id,
          this.code,
        );

        this.fileRepository.updateFileContent(model).subscribe(() => {
        });
      });
  }

  ngOnDestroy(): void {
    this.typeAheadObservable.unsubscribe();
    this.contentLoadedSubscription.unsubscribe();
    this.editorViewActionUns.unsubscribe();
  }

  ngAfterViewInit() {
    this.contentLoadedSubscription = this.contentLoadedEvent.subscribe((content: string) => {
      this.code = content;
    })
  }

  onChange() {
    this.typeAheadSource.next();
  }
}
