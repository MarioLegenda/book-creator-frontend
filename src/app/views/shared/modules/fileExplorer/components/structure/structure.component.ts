import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileSystemRepository} from "../../../../../../repository/FileSystemRepository";
import {Subject} from "rxjs";
import {IBufferEvent} from "../../models/IBufferEvent";
import {ICutFinishedEvent} from "../../models/ICutFinishedEvent";
import {ICodeProject} from "../../../../../codeEditor/models/ICodeProject";
import {IDirectory} from "../../models/IDirectory";

@Component({
  selector: 'cms-structure',
  styleUrls: [
    './structure.component.scss',
  ],
  templateUrl: './structure.component.html',
})
export class StructureComponent implements OnInit, AfterViewInit {
  structure = [];
  breadcrumbs: string[] = [];

  copyBufferSubject = new Subject<IBufferEvent>();
  copyUnBufferSubject = new Subject<IBufferEvent>();
  fileCutFinishedSubject = new Subject<ICutFinishedEvent>();
  directoryCutFinishedSubject = new Subject<ICutFinishedEvent>();

  @Input('project') project: ICodeProject;

  @ViewChild('structureWrapper', {static: true}) structureWrapper: ElementRef;

  constructor(
    private fileSystemRepository: FileSystemRepository,
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
    this.fileSystemRepository.getRootDirectory(this.project.uuid).subscribe((resolver) => {
      const directory: IDirectory = resolver.factory(this.project.uuid, resolver.originalModel);

      this.breadcrumbs.push(directory.name);

      this.structure.push(directory);
    });
  }
}
