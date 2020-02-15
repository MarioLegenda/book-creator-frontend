import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../../../repository/DirectoryRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class EditDirectoryDialogComponent {
  placeholderName: string;

  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<EditDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {
    this.placeholderName = model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  editDirectory() {
    if (!this.placeholderName) return this.dialogRef.close();

    const model = HttpModel.renameDirectoryModel(
      this.model.codeProjectUuid,
      this.model.name,
      this.model.id,
      this.model.depth,
      this.placeholderName,
    );

    this.directoryRepository.renameDirectory(model).subscribe((res: any) => {
      this.dialogRef.close(res.data);
    });
  }
}
