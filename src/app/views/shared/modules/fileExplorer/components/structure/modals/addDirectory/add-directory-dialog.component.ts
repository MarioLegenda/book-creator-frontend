import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../../../repository/DirectoryRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './add-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddDirectoryDialogComponent {
  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<AddDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  createDirectory() {
    if (!this.model.name) return this.dialogRef.close();

    const model = HttpModel.createDirectoryModel(
      this.model.codeProjectUuid,
      this.model.depth + 1,
      this.model.name,
      this.model.id,
      false,
    );

    this.directoryRepository.createDirectory(model).subscribe((resolver) => {
      const model = resolver.factory(this.model.codeProjectUuid, resolver.originalModel);

      this.dialogRef.close(model);
    })
  }
}
