import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateTextBlock} from "../../../../store/page/httpActions";
import {CodeBlockModel} from "../../../../model/app/CodeBlockModel";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'cms-code-block',
  styleUrls: ['./code-block.component.scss'],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>
  ) {}

  icons = {
    'remove': 'fas fa-trash-alt',
  };

  private typeAheadSource = new Subject();
  private typeAheadObservable = null;

  componentState = {
    hovered: false,
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

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.component));
  }

  ngOnInit() {
    this.componentState.code = this.component.text;

    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const model = {
          blockUuid: this.component.blockUuid,
          position: this.component.position,
          text: this.componentState.code,
        };

        this.store.dispatch(httpUpdateTextBlock(model));
      });
  }

  ngOnDestroy(): void {
    if (this.typeAheadObservable) {
      this.typeAheadObservable.unsubscribe();
    }
  }

  onChange() {
    this.typeAheadSource.next();
  }
}
