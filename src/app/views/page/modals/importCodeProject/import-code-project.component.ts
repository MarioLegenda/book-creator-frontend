import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";

@Component({
  selector: 'cms-import-code-project-modal',
  templateUrl: './import-code-project.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './import-code-project.component.scss',
  ]
})
export class ImportCodeProjectDialogComponent implements OnInit {
  projects = [];

  constructor(
    public dialogRef: MatDialogRef<ImportCodeProjectDialogComponent>,
    private codeProjectsRepository: CodeProjectsRepository,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  ngOnInit() {
    this.codeProjectsRepository.getProjects(10, 1).subscribe((res: any) => {
      this.projects = res;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  onCreateNew() {
    this.dialogRef.close('newCodeProject');
  }

  onSelect(item) {
    this.dialogRef.close(item);
  }
}
