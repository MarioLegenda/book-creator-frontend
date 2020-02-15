import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class EditFileDialogComponent {
  placeholderName: string;

  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {
    this.placeholderName = model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  editFile() {
    if (!this.placeholderName) return this.dialogRef.close();

    const model = HttpModel.renameFileModel(
      this.model.name,
      this.model.id,
      this.model.codeProjectUuid,
      this.model.directoryId,
      this.placeholderName,
    );

    this.fileRepository.renameFile(model).subscribe((res: any) => {
      this.dialogRef.close(res.data);
    });
  }
}
