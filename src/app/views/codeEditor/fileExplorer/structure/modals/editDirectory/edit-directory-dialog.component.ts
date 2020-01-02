import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {DirectoryAppModel} from "../../../../../../model/app/codeEditor/DirectoryAppModel";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-directory-modal.component.html',
  styleUrls: ['../../../../../../main/global-dialog.component.scss']
})
export class EditDirectoryDialogComponent {
  placeholderName: string;

  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<EditDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel)
  {
    this.placeholderName = model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  editDirectory() {
    if (!this.placeholderName) return this.dialogRef.close();

    this.directoryRepository.renameDirectory({
      codeProjectUuid: this.model.codeProjectUuid,
      name: this.model.name,
      newName: this.placeholderName,
      directoryId: this.model.directoryId,
      depth: this.model.depth,
    }).subscribe((res: any) => {
      this.dialogRef.close(res.data);
    });
  }
}
