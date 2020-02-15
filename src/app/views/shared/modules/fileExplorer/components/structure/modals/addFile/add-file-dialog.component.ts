import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddFileDialogComponent {
  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  createFile() {
    if (!this.model.name) return this.dialogRef.close();

    const model = HttpModel.newFileModel(
      this.model.codeProjectUuid,
      this.model.name,
      this.model.directoryId,
      this.model.content,
    );

    this.fileRepository.addFileToDirectory(model).subscribe((resolver) => {
      const model = resolver.factory(this.model.codeProjectUuid, resolver.originalModel);

      this.dialogRef.close(model);
    });
  }
}
