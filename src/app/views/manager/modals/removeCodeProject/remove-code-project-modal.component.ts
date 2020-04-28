import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-remove-confirm-modal',
  templateUrl: './remove-code-project-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './remove-code-project-modal.component.scss'
  ]
})
export class RemoveCodeProjectModalComponent {
  removeFailed: boolean = false;
  inFlight: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RemoveCodeProjectModalComponent>,
    private codeProjectRepository: CodeProjectsRepository,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close(false);
  }

  confirmDelete() {
    this.inFlight = true;
    const model = HttpModel.removeCodeProject(this.model.uuid);

    this.codeProjectRepository.removeCodeProject(model).subscribe(() => {
      this.dialogRef.close(true);
      this.inFlight = false;
    }, () => {
      this.inFlight = false;
      this.removeFailed = true;
    });
  }
}
