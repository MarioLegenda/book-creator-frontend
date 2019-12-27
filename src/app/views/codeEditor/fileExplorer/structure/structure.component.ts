import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DirectoryRepository} from "../../../../repository/DirectoryRepository";
import {CodeProjectAppModel} from "../../../../model/app/codeEditor/CodeProjectAppModel";
import {DirectoryHttpModel} from "../../../../model/http/codeEditor/DirectoryHttpModel";
import {DirectoryAppModel} from "../../../../model/app/codeEditor/DirectoryAppModel";
import {FileHttpModel} from "../../../../model/http/codeEditor/FileHttpModel";
import {FileRepository} from "../../../../repository/FileRepository";
import {Subject} from "rxjs";
import StructureTracker from "../../../../library/StructureTracker";
import Util from "../../../../library/Util";
import {FileAppModel} from "../../../../model/app/codeEditor/FileAppModel";
import {Store} from "@ngrx/store";
import {viewEditorDirectoryEmptied} from "../../../../store/editor/viewActions";

@Component({
  selector: 'cms-structure',
  styleUrls: [
    './structure.component.scss',
  ],
  templateUrl: './structure.component.html',
  providers: [
    {useClass: StructureTracker, provide: StructureTracker}
  ]
})
export class StructureComponent implements OnInit, AfterViewInit {
  structure = [];

  @Input('project') project: CodeProjectAppModel;

  // @ts-ignore
  @ViewChild('structureWrapper') structureWrapper: ElementRef;

  private expanding = false;

  constructor(
    private directoryRepository: DirectoryRepository,
    private fileRepository: FileRepository,
    private structureTracker: StructureTracker,
    private store: Store<any>,
  ) {}

  isDirectory(entry): boolean {
    return entry.type === 'directory';
  }

  isFile(entry): boolean {
    return entry.type === 'file';
  }

  expandDirectoryEvent(directory: DirectoryAppModel) {
    this.expanding = true;

    if (!directory.isRoot) {
      let tempSubject = new Subject();

      this.getSubstructure(directory, tempSubject);

      tempSubject.subscribe((structure: any[]) => {
        if (!this.structureTracker.hasStructure(directory.directoryId)) {
          this.structureTracker.createStructure(directory.directoryId);
        }

        let inx = null;
        for (let i = 0; i < this.structure.length; i++) {
          if (this.structure[i].type === 'directory' && this.structure[i].directoryId === directory.directoryId) {
            inx = i;

            break;
          }
        }

        const ids: string[] = [];
        for (const s of structure) {
          if (!ids.includes(s)) {
            ids.push((s.type === 'file') ? s.id : s.directoryId);
          }
        }

        this.structureTracker.addToStructure(directory.directoryId, ids);

        this.structure.splice(inx + 1, 0, ...structure);

        this.expanding = false;
      });
    }
  }

  unExpandDirectoryEvent(directory: DirectoryAppModel) {
    if (this.expanding) return;

    const structures = this.structureTracker.getStructure(directory.directoryId);

    this.removeStructures(structures);

    this.structureTracker.clearStructure(directory.directoryId);
  }

  addDirectoryEvent(data) {
    const parent: DirectoryAppModel = data.parent;
    const created: DirectoryAppModel = data.created;

    if (!this.structureTracker.hasStructure(parent.directoryId)) {
      this.structureTracker.createStructure(parent.directoryId);
    }

    this.structureTracker.addItemToStructure(parent.directoryId, created.directoryId);

    const idx: number = this.structure.findIndex(val => val.directoryId === parent.directoryId);

    this.structure.splice(idx + 1, 0, created);
  }

  addFileEvent(data) {
    const parent: DirectoryAppModel = data.parent;
    const file: FileAppModel = data.file;

    if (!this.structureTracker.hasStructure(parent.directoryId)) {
      this.structureTracker.createStructure(parent.directoryId);
    }

    this.structureTracker.addItemToStructure(parent.directoryId, file.id);

    const idx: number = this.structure.findIndex(val => val.directoryId === parent.directoryId);

    this.structure.splice(idx + this.structureTracker.getStructureLen(parent.directoryId), 0, file);
  }

  removeFileEvent(file: FileAppModel) {
    this.structureTracker.removeItemFromStructure(file.directoryId, file.id);

    const idx = this.structure.findIndex(val => {
      return val.type === 'file' && val.id === file.id;
    });

    this.structure.splice(idx, 1);

    if (this.structureTracker.getStructureLen(file.directoryId) === 0) {
      for (const s of this.structure) {
        if (s.type === 'directory' && file.directoryId === s.directoryId) {
          this.store.dispatch(viewEditorDirectoryEmptied({directoryId: s.directoryId}));

          break;
        }
      }
    }
  }

  removeDirectoryEvent(directory: DirectoryAppModel) {
    if (!this.structureTracker.hasStructure(directory.directoryId)) return this.removeDirectoryStructure(directory.directoryId);

    const structures = this.structureTracker.getStructure(directory.directoryId);

    this.removeStructures(structures);

    this.structureTracker.clearStructure(directory.directoryId);

    this.removeDirectoryStructure(directory.directoryId);
  }

  ngOnInit() {
    this.expandRootDirectory();
  }

  ngAfterViewInit() {
    const height = document.body.offsetHeight - 87;

    this.structureWrapper.nativeElement.setAttribute('style', `height: ${height}px`);
  }

  private expandRootDirectory() {
    this.directoryRepository.getRootDirectory(this.project.uuid).subscribe((model: DirectoryHttpModel) => {
      const directoryModel: DirectoryAppModel = model.convertToAppModel(this.project.uuid);

      if (!this.structureTracker.hasStructure(directoryModel.directoryId)) {
        this.structureTracker.createStructure(directoryModel.directoryId);
      }

      this.structure.push(directoryModel);

      let tempSubject = new Subject();

      this.getSubstructure(directoryModel, tempSubject);

      tempSubject.subscribe((structure: any[]) => {
        this.structure = [...this.structure, ...structure];

        const ids: string[] = [];
        for (const s of structure) {
          ids.push(s.directoryId);
        }

        this.structureTracker.addToStructure(directoryModel.directoryId, ids);

        tempSubject.unsubscribe();

        tempSubject = null;

        this.sortStructure();
      });
    });
  }

  private getSubstructure(directory: DirectoryAppModel, subject: Subject<any>) {
    this.directoryRepository.getSubdirectories(directory.directoryId).subscribe((models: DirectoryHttpModel[]) => {
      const structure = [];
      for (const dir of models) {
        structure.push(dir.convertToAppModel(directory.codeProjectUuid));
      }

      this.fileRepository.getFilesFromDirectory(directory.directoryId).subscribe((files: FileHttpModel[]) => {
        for (const file of files) {
          structure.push(file.convertToAppModel(file.id));
        }

        subject.next(structure);
      });
    });
  }

  private removeStructures(structures: string[]): void {
    for (const s of structures) {
      if (this.structureTracker.hasStructure(s)) {
        const st = this.structureTracker.getStructure(s);
        this.structureTracker.clearStructure(s);

        this.removeStructures(st);
      }

      this.structureTracker.clearStructure(s);

      const idx: number = this.structure.findIndex((v) => {
        if (v.type === 'file' && v.id === s) return true;
        if (v.type === 'directory' && v.directoryId === s) return true;

        return false;
      });

      if (idx !== -1) {
        this.structure.splice(idx, 1);
      }
    }
  }

  private sortStructure() {
    this.structure.sort((a, b) => {
      if (a.type === 'file' || b.type === 'file') {
        return 0;
      }

      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  private removeDirectoryStructure(directoryId: string) {
    const idx = this.structure.findIndex(val => val.type === 'directory' && val.directoryId === directoryId);

    this.structure.splice(idx, 1);
  }
}
