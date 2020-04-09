import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, of, Subscription} from "rxjs";
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

  private typeAheadSource = new BehaviorSubject([]);
  private typeAheadObservable = null;
  private contentLoadedSubscription: Subscription;
  private editorViewActionUns;

  componentState = {
    editorOptions: null,
    code: '',
  };

  constructor(
    private store: Store<any>,
    private fileRepository: FileRepository,
  ) {}

  ngOnInit() {
    const editorOptions = {
      theme: 'vs-light',
      language: this.project.environment.language,
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      },
    };

    this.componentState.editorOptions = editorOptions;

    this.editorViewActionUns = this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        this.componentState.code = action.content;
      }
    });

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        if (this.componentState.code) {
          const model = HttpModel.updateFileContentModel(
            this.project.uuid,
            this.tab.id,
            this.componentState.code,
          );

          this.fileRepository.updateFileContent(model).subscribe(() => {
          });
        }
      });
  }

  ngAfterViewInit() {
    const h = document.body.offsetHeight;

    this.wrapperRef.nativeElement.setAttribute('style', `height: ${h - 45}px`);

    this.contentLoadedSubscription = this.contentLoadedEvent.subscribe((content: string) => {
      this.componentState.code = content;
    })
  }

  onChange() {
    this.typeAheadSource.next([]);
  }

  ngOnDestroy(): void {
    this.typeAheadObservable.unsubscribe();
    this.contentLoadedSubscription.unsubscribe();
    this.editorViewActionUns.unsubscribe();
  }
}
