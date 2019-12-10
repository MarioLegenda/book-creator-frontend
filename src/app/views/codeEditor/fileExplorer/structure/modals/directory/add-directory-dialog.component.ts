import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../repository/FileRepository";
import {FileAppModel} from "../../../../../../model/app/codeEditor/FileAppModel";
import {FileHttpModel} from "../../../../../../model/http/codeEditor/FileHttpModel";
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {DirectoryAppModel} from "../../../../../../model/app/codeEditor/DirectoryAppModel";
import {DirectoryHttpModel} from "../../../../../../model/http/codeEditor/DirectoryHttpModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './add-directory-modal.component.html',
  styleUrls: ['./add-directory-modal.component.scss']
})
export class AddDirectoryDialogComponent {
  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<AddDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDirectory() {
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
