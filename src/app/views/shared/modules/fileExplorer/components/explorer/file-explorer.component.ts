import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Util from "../../../../../../library/Util";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent implements AfterViewInit, OnInit {
  searchFocused = false;

  @Input('project') project: any;
  @Input('showEditorActions') showEditorActions: boolean = true;

  @Input('enableAddDirectory') enableAddDirectory: boolean = true;
  @Input('enableAddFile') enableAddFile: boolean = true;
  @Input('enableRemoveDirectory') enableRemoveDirectory: boolean = true;
  @Input('enableRemoveFile') enableRemoveFile: boolean = true;
  @Input('enableEditFile') enableEditFile: boolean = true;
  @Input('enableEditDirectory') enableEditDirectory: boolean = true;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;
  // @ts-ignore
  @ViewChild('actionWrapperRef') actionWrapperRef: ElementRef;

  componentState = {
    selectedAction: 'project',
    selectedActionClass: {},
    searchTerm: '',
  };

  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  ngOnInit() {
    this.subscribeTypeahead();
  }

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);

    if (this.actionWrapperRef) {
      Util.setHeightFromWrapper(document.body, this.actionWrapperRef.nativeElement);
    }
  }

  onSearchFocus() {
    this.searchFocused = true;
  }

  onSearchBlur() {
    this.searchFocused = false;
  }

  onSearchTerm() {
    this.typeAheadSource.next(this.componentState.searchTerm);
  }

  selectAction(action) {
    this.componentState.selectedAction = action;
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        
      });
  }
}
