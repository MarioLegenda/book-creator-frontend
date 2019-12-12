import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BehaviorSubject, of} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'cms-text-editor',
  styleUrls: [
    './text-editor.component.scss',
  ],
  templateUrl: './text-editor.component.html',
})
export class TextEditorComponent {
  @Input('hasTabs') hasTabs: boolean;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;

  private typeAheadSource = new BehaviorSubject([]);

  componentState = {
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

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        this.componentState.code = action.content;
      }
    });

    this.typeAheadSource.pipe(
      debounceTime(2000),
    )
      .subscribe(() => {
        if (this.componentState.code) {
          console.log(this.componentState.code);
        }
      });
  }

  ngAfterViewInit() {
    const h = document.body.offsetHeight;

    this.wrapperRef.nativeElement.setAttribute('style', `height: ${h - 45}px`);
  }

  onChange() {
    this.typeAheadSource.next([]);
  }


}
