import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {DirectoryAppModel} from "../../../../../../model/app/codeEditor/DirectoryAppModel";
import {DirectoryHttpModel} from "../../../../../../model/http/codeEditor/DirectoryHttpModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './add-directory-modal.component.html',
  styleUrls: ['../global-dialog.component.scss']
})
export class AddDirectoryDialogComponent {
  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<AddDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  createDirectory() {
    if (!this.model.name) return this.dialogRef.close();

    this.directoryRepository.createDirectory({
      data: {
        codeProjectUuid: this.model.codeProjectUuid,
        depth: this.model.depth + 1,
        name: this.model.name,
        parent: this.model.directoryId,
        isRoot: false,
      }
    }).subscribe((model: DirectoryHttpModel) => {
      this.dialogRef.close(model.convertToAppModel(this.model.codeProjectUuid));
    })
  }
}
