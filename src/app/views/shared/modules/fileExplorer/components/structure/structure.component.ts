import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {FileRepository} from "../../../../../../repository/FileRepository";
import {Subject} from "rxjs";
import {StructureTracker} from "../../../../../../library/StructureTracker";
import {Store} from "@ngrx/store";
import {viewEditorDirectoryEmptied} from "../../../../../../store/editor/viewActions";
import {httpRemoveFileFinished} from "../../../../../../store/editor/httpActions";

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
export class StructureComponent implements OnInit {
  structure = [];

  @Input('project') project: any;

  // @ts-ignore
  @ViewChild('structureWrapper') structureWrapper: ElementRef;

  constructor(
    private directoryRepository: DirectoryRepository,
    private fileRepository: FileRepository,
    private structureTracker: StructureTracker,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.expandRootDirectory();
  }

  isDirectory(entry): boolean {
    return entry.type === 'directory';
  }

  isFile(entry): boolean {
    return entry.type === 'file';
  }

  expandDirectoryEvent(directory: any) {
    if (directory.isRoot) return;

    let tempSubject = new Subject();

    this.getSubstructure(directory, tempSubject);

    tempSubject.subscribe((structure: any[]) => {
      if (!this.structureTracker.hasStructure(directory.id)) {
        this.structureTracker.createStructure(directory.id);
      }

      let inx = null;
      for (let i = 0; i < this.structure.length; i++) {
        if (this.structure[i].type === 'directory' && this.structure[i].id === directory.id) {
          inx = i;

          break;
        }
      }

      const ids: string[] = [];
      for (const s of structure) {
        if (!ids.includes(s)) {
          ids.push((s.type === 'file') ? s.id : s.id);
        }
      }

      this.structureTracker.addToStructure(directory.id, ids);

      this.structure.splice(inx + 1, 0, ...structure);
    });
  }

  unExpandDirectoryEvent(directory) {
    if (directory.isRoot) return;

    const structures = this.structureTracker.getStructure(directory.id);

    this.removeStructures(structures);

    this.structureTracker.clearStructure(directory.id);
  }

  addDirectoryEvent(data) {
    const parent = data.parent;
    const created = data.created;

    if (!this.structureTracker.hasStructure(parent.id)) {
      this.structureTracker.createStructure(parent.id);
    }

    this.structureTracker.addItemToStructure(parent.id, created.id);

    const idx: number = this.structure.findIndex(val => val.id === parent.id);

    this.structure.splice(idx + 1, 0, created);
  }

  addFileEvent(data) {
    const parent = data.parent;
    const file = data.file;

    if (!this.structureTracker.hasStructure(parent.id)) {
      this.structureTracker.createStructure(parent.id);
    }

    this.structureTracker.addItemToStructure(parent.id, file.id);

    let idx = null;
    for (let i = 0; i < this.structure.length; i++) {
      const s = this.structure[i];

      if (s.type === 'file' && s.directoryId === file.directoryId) {
        idx = i;
      }
    }

    if (idx === null) {
      for (let i = 0; i < this.structure.length; i++) {
        const s = this.structure[i];

        if (s.type === 'directory' && s.id === file.directoryId) {
          idx = i;
        }
      }
    }

    this.structure.splice(idx + 1, 0, file);
  }

  removeFileEvent(file) {
    this.structureTracker.removeItemFromStructure(file.directoryId, file.id);

    const idx = this.structure.findIndex(val => {
      return val.type === 'file' && val.id === file.id;
    });

    this.structure.splice(idx, 1);

    this.sendDirectoryEmptied(file.directoryId);

    if (this.structureTracker.getStructureLen(file.directoryId) === 0) {
      this.structureTracker.clearStructure(file.directoryId);
    }
  }

  removeDirectoryEvent(directory) {
    if (!this.structureTracker.hasStructure(directory.id)) {
      for (const s of this.structure) {
        if (s.type === 'directory' && !s.isRoot && this.structureTracker.getStructureLen(s.id)) {
          this.structureTracker.clearStructure(s.id);
          this.store.dispatch(viewEditorDirectoryEmptied({directoryId: s.id}));
        }
      }

      this.removeDirectoryStructure(directory.id);

      return this.sendDirectoryEmptied(directory.id);
    }

    const structures = this.structureTracker.getStructure(directory.id);

    this.removeStructures(structures);

    this.structureTracker.clearStructure(directory.id);

    this.removeDirectoryStructure(directory.id);

    this.sendDirectoryEmptied(directory.id);
  }

  private expandRootDirectory() {
    this.directoryRepository.getRootDirectory(this.project.uuid).subscribe((resolver) => {
      const directory = resolver.factory(this.project.uuid, resolver.originalModel);

      if (!this.structureTracker.hasStructure(directory.id)) {
        this.structureTracker.createStructure(directory.id);
      }

      this.structure.push(directory);

      let tempSubject = new Subject();

      this.getSubstructure(directory, tempSubject);

      tempSubject.subscribe((structure: any) => {
        this.structure = [...this.structure, ...structure];

        const ids: string[] = [];
        for (const s of structure) {
          ids.push(s.id);
        }

        this.structureTracker.addToStructure(directory.id, ids);
      });
    });
  }

  private getSubstructure(directory: any, subject: Subject<any>) {
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
        if (v.type === 'directory' && v.id === s) return true;

        return false;
      });

      if (idx !== -1) {
        if (this.structure[idx].type === 'file') {
          this.store.dispatch(httpRemoveFileFinished(this.structure[idx]));
        }

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
    const idx = this.structure.findIndex(val => val.type === 'directory' && val.id === directoryId);

    this.structure.splice(idx, 1);
  }

  private sendDirectoryEmptied(directoryId: string) {
    if (this.structureTracker.getStructureLen(directoryId) === 0) {
      for (const s of this.structure) {
        if (s.type === 'directory' && directoryId === s.id) {
          this.store.dispatch(viewEditorDirectoryEmptied({directoryId: s.id}));

          break;
        }
      }
    }
  }
}
