import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, of} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {FileRepository} from "../../../../repository/FileRepository";
import {FileTab} from "../../../../model/app/codeEditor/FileTab";

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
  @Input('codeProjectUuid') codeProjectUuid: string;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;

  private typeAheadSource = new BehaviorSubject([]);
  private typeAheadObservable = null;

  componentState = {
    editorOptions: {
      theme: 'vs-light',
      language: 'javascript',
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      },
    },
    code: '',
  };

  constructor(
    private store: Store<any>,
    private fileRepository: FileRepository,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        this.componentState.code = action.content;
      }
    });

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        if (this.componentState.code) {
          this.fileRepository.updateFileContent(
            this.codeProjectUuid,
            this.tab.id,
            this.componentState.code
          ).subscribe(() => {
          });
        }
      });
  }

  ngAfterViewInit() {
    const h = document.body.offsetHeight;

    this.wrapperRef.nativeElement.setAttribute('style', `height: ${h - 45}px`);

    this.contentLoadedEvent.subscribe((content: string) => {
      this.componentState.code = content;
    })
  }

  onChange() {
    this.typeAheadSource.next([]);
  }

  ngOnDestroy(): void {
    this.typeAheadObservable.unsubscribe();
  }

}
