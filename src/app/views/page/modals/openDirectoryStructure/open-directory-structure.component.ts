import {Component, Inject, Input, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";

@Component({
  selector: 'cms-new-code-project-modal',
  templateUrl: './open-directory-structure.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './open-directory-structure.component.scss',
  ]
})
export class OpenDirectoryStructureDialogComponent implements OnInit{
  project: null;

  constructor(
    public dialogRef: MatDialogRef<OpenDirectoryStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private codeProjectsRepository: CodeProjectsRepository,
  ) {}

  ngOnInit(): void {
    this.codeProjectsRepository.getSingleProject(this.model.codeProjectUuid).subscribe((project: any) => {
      this.project = project;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
