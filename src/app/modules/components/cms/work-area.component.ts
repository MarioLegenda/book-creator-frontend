import {AfterContentInit, AfterViewInit, Component, ContentChild, Input, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./scss/work-area.component.scss'],
  templateUrl: './html/work-area.component.html',
})
export class WorkAreaComponent implements OnInit, AfterViewInit {
  textBlockActions: Observable<{internalName: string, shortDescription: string}>;

  Editor = BalloonEditor;
  @ViewChild('workAreaEditor', {static: false}) workAreaEditor;

  constructor(private store: Store<any>) {
    this.textBlockActions = store.pipe(select('textBlockActions'));
  }

  ngAfterViewInit(): void {
    const editorElement = this.workAreaEditor.editorElement;

    editorElement.style.border = '1px dashed #d3d3d3';
    editorElement.style['border-radius'] = '5px';
  }

  ngOnInit() {
    this.textBlockActions.subscribe((action) => {
      console.log(action);
    });
  }
}
