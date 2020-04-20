import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {FileRepository} from "../../../../../../repository/FileRepository";
import {Subject} from "rxjs";
import {IDirectory} from "../../models/IDirectory";
import {IBufferEvent} from "../../models/IBufferEvent";
import {ICutFinishedEvent} from "../../models/ICutFinishedEvent";

@Component({
  selector: 'cms-structure',
  styleUrls: [
    './structure.component.scss',
  ],
  templateUrl: './structure.component.html',
})
export class StructureComponent implements OnInit, OnDestroy, AfterViewInit {
  structure = [];

  copyBufferSubject = new Subject<IBufferEvent>();
  copyUnBufferSubject = new Subject<IBufferEvent>();
  fileCutFinishedSubject = new Subject<ICutFinishedEvent>();

  @Input('project') project: any;

  // @ts-ignore
  @ViewChild('structureWrapper', {static: true}) structureWrapper: ElementRef;

  constructor(
    private directoryRepository: DirectoryRepository,
    private fileRepository: FileRepository,
  ) {}

  ngOnInit() {
    this.expandRootDirectory();
  }

  ngAfterViewInit() {
    const fe = document.getElementById('_file-explorer').offsetHeight;
    const e = document.getElementById('_editor').offsetHeight;

    this.structureWrapper.nativeElement.setAttribute('style', `height: ${e - fe}px`);
  }

  ngOnDestroy(): void {
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

      let tempSubject = new Subject();

      this.getSubstructure(directory, tempSubject);

      tempSubject.subscribe((structure: any) => {
        for (const s of structure) {
          this.structure.push(s);
        }
      });
    });
  }

  private getSubstructure(directory: IDirectory, subject: Subject<any>) {
    this.directoryRepository.getSubdirectories(this.project.uuid, directory.id).subscribe((resolver) => {
      const structure = [];

      const models = resolver.factory(this.project.uuid, resolver.originalModel);

      for (const model of models) {
        structure.push(model);
      }

      this.fileRepository.getFilesFromDirectory(this.project.uuid, directory.id).subscribe((resolver) => {
        const models = resolver.factory(this.project.uuid, resolver.originalModel);
        for (const model of models) {
          structure.push(model);
        }

        subject.next(structure);
      });
    });
  }
}
