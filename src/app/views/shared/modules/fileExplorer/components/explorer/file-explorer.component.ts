import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {HttpModel} from "../../../../../../model/http/HttpModel";
import {FileSystemRepository} from "../../../../../../repository/FileSystemRepository";
import {ICodeProject} from "../../../../../codeEditor/models/ICodeProject";
import {MatDialog} from "@angular/material/dialog";
import {EditorHelpModalComponent} from "./modals/editor-help.component";
import {ISearchEvent} from "../../models/ISearchEvent";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent implements OnInit {
  searchFocused = false;

  @Input('project') project: ICodeProject;
  @Input('showEditorActions') showEditorActions: boolean = true;
  @Input('enableAddDirectory') enableAddDirectory: boolean = true;
  @Input('enableAddFile') enableAddFile: boolean = true;
  @Input('enableRemoveDirectory') enableRemoveDirectory: boolean = true;
  @Input('enableRemoveFile') enableRemoveFile: boolean = true;
  @Input('enableEditFile') enableEditFile: boolean = true;
  @Input('enableEditDirectory') enableEditDirectory: boolean = true;

  searchSubject = new ReplaySubject<ISearchEvent>();

  @ViewChild('wrapperRef', {static: true}) wrapperRef: ElementRef;
  @ViewChild('actionWrapperRef', {static: true}) actionWrapperRef: ElementRef;

  searchTerm: string = '';

  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  constructor(
    private fileSystemRepository: FileSystemRepository,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.subscribeTypeahead();
  }

  onHelp(): void {
    this.dialog.open(EditorHelpModalComponent, {
      width: '70%',
      data: {},
    });
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

        this.fileSystemRepository.searchDirsAndFiles(model).subscribe((data) => {
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
