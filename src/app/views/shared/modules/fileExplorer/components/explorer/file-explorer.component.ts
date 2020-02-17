import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Util from "../../../../../../library/Util";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {HttpModel} from "../../../../../../model/http/HttpModel";
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";

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

  constructor(
    private directoryRepository: DirectoryRepository
  ) {}

  ngOnInit() {
    this.subscribeTypeahead();
  }

  ngAfterViewInit(): void {
    const height = window.innerHeight;

    this.wrapperRef.nativeElement.setAttribute('style', `max-height: ${height}px`)
  }

  onSearchFocus() {
    this.searchFocused = true;
  }

  onSearchBlur() {
    if (this.componentState.searchTerm) return;

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
        if (!this.componentState.searchTerm) return;

        const model = HttpModel.searchDirsAndFiles(
          this.project.uuid,
          this.componentState.searchTerm,
        );

        this.directoryRepository.searchDirsAndFiles(model).subscribe((data) => {
          console.log(data);
        });
      });
  }
}
