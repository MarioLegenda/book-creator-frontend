import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';import {FileAppModel} from "../../../../../../model/app/codeEditor/FileAppModel";
import {FileRepository} from "../../../../../../repository/FileRepository";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-file-modal.component.html',
  styleUrls: ['../../../../../../main/global-dialog.component.scss']
})
export class EditFileDialogComponent {
  placeholderName: string;

  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: FileAppModel)
  {
    this.placeholderName = model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  editFile() {
    if (!this.placeholderName) return this.dialogRef.close();

    this.fileRepository.renameFile({
      name: this.model.name,
      fileId: this.model.id,
      codeProjectUuid: this.model.codeProjectUuid,
      directoryId: this.model.directoryId,
      newName: this.placeholderName,
    }).subscribe((res: any) => {
      this.dialogRef.close(res.data);
    });
  }
}
