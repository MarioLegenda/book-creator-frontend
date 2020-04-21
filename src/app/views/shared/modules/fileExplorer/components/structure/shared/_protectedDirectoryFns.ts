import {Subject} from "rxjs";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";
import {HttpModel} from "../../../../../../../model/http/HttpModel";
import {EditDirectoryDialogComponent} from "../modals/editDirectory/edit-directory-dialog.component";

export function getStructure(subject: Subject<any>) {
  this.fileSystemRepository.getSubdirectories(this.project.uuid, this.directory.id).subscribe((resolver) => {
    const structure = [];

    const models = resolver.factory(this.project.uuid, resolver.originalModel);

    for (const model of models) {
      model.type = 'directory';
      structure.push(model);
    }

    this.fileRepository.getFilesFromDirectory(this.project.uuid, this.directory.id).subscribe((resolver) => {
      const models = resolver.factory(this.project.uuid, resolver.originalModel);
      for (const model of models) {
        model.type = 'file';
        structure.push(model);
      }

      subject.next(structure);
    });
  });
}

export function doEditDirectory(): void {
  const data = {
    codeProjectUuid: this.directory.codeProjectUuid,
    name: this.directory.name,
    id: this.directory.id,
    depth: this.directory.depth,
    type: 'directory',
    isRoot: false,
    extension: this.extension,
  };

  const dialogRef = this.dialog.open(EditDirectoryDialogComponent, {
    width: '400px',
    data: data,
  });

  dialogRef.afterClosed().subscribe((resolver) => {
    if (!resolver) return;

    if (resolver) {
      const directory = resolver.factory(this.directory.codeProjectUuid, resolver.originalModel);

      this.directory.name = directory.name;

      this.toggleActionSet = !this.toggleActionSet;
    }
  });
}

export function removeDirectory(): void {
  const dialogRef = this.dialog.open(DeleteDirectoryDialogComponent, {
    width: '400px',
    data: {name: this.directory.name},
  });

  dialogRef.afterClosed().subscribe((decision) => {
    if (decision !== true) return;

    const model = HttpModel.removeDirectoryModel(
      this.directory.codeProjectUuid,
      this.directory.id,
    );

    this.fileSystemRepository.removeDirectory(model).subscribe(() => {
      this.parentEvent.next(this.directory);
    });
  });
}
