import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../repository/FileRepository";
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {FileHttpModel} from "../../../../../model/http/codeEditor/FileHttpModel";

@Component({
  selector: 'cms-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['./add-file-modal.component.scss']
})
export class AddFileDialogComponent {
  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: FileAppModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFile() {
    this.fileRepository.addFileToDirectory(this.model.createNewFileHttpModel()).subscribe((model: FileHttpModel) => {
      this.dialogRef.close(model.convertToAppModel());
    });
  }
}
