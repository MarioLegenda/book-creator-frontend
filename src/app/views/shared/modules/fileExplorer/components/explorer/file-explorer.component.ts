import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ReplaySubject, Subject, Subscription} from "rxjs";
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

  searchSubject = new ReplaySubject();

  @ViewChild('wrapperRef', {static: true}) wrapperRef: ElementRef;
  @ViewChild('actionWrapperRef', {static: true}) actionWrapperRef: ElementRef;

  selectedAction: string = 'project';
  selectedActionClass = {};
  searchTerm: string = '';

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
    if (this.searchTerm) return;

    this.searchFocused = false;
  }

  onSearchTerm() {
    this.typeAheadSource.next(this.searchTerm);
  }

  selectAction(action) {
    this.selectedAction = action;
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        if (!this.searchTerm) {
          return this.searchSubject.next({
            directories: [],
            files: [],
            isEmpty: true,
            restart: true,
          });
        }

        const model = HttpModel.searchDirsAndFiles(
          this.project.uuid,
          this.searchTerm,
        );

        this.directoryRepository.searchDirsAndFiles(model).subscribe((data) => {
          const searchResult = {
            directories: data.directories.map(d => {d.type = 'directory'; return d}),
            files: data.files.map(f => {f.type = 'file'; return f}),
            isEmpty: data.isEmpty,
            restart: (!this.searchTerm),
          };

          this.searchSubject.next(searchResult);
        });
      });
  }
}
