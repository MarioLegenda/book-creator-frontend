import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {Subject} from "rxjs";
import {IBufferEvent} from "../../models/IBufferEvent";
import {ICutFinishedEvent} from "../../models/ICutFinishedEvent";
import {ICodeProject} from "../../../../../codeEditor/models/ICodeProject";

@Component({
  selector: 'cms-structure',
  styleUrls: [
    './structure.component.scss',
  ],
  templateUrl: './structure.component.html',
})
export class StructureComponent implements OnInit, AfterViewInit {
  structure = [];

  copyBufferSubject = new Subject<IBufferEvent>();
  copyUnBufferSubject = new Subject<IBufferEvent>();
  fileCutFinishedSubject = new Subject<ICutFinishedEvent>();
  directoryCutFinishedSubject = new Subject<ICutFinishedEvent>();

  @Input('project') project: ICodeProject;

  // @ts-ignore
  @ViewChild('structureWrapper', {static: true}) structureWrapper: ElementRef;

  constructor(
    private directoryRepository: DirectoryRepository,
  ) {}

  ngOnInit() {
    this.expandRootDirectory();
  }

  ngAfterViewInit() {
    const fe = document.getElementById('_file-explorer').offsetHeight;
    const e = document.getElementById('_editor').offsetHeight;

    this.structureWrapper.nativeElement.setAttribute('style', `height: ${e - fe}px`);
  }

  isDirectory(entry): boolean {
    return entry.type === 'directory';
  }

  isFile(entry): boolean {
    return entry.type === 'file';
  }

  private expandRootDirectory(): void {
    this.directoryRepository.getRootDirectory(this.project.uuid).subscribe((resolver) => {
      const directory = resolver.factory(this.project.uuid, resolver.originalModel);

      this.structure.push(directory);
    });
  }
}
