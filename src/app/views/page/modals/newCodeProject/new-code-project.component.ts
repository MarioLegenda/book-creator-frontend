import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";

@Component({
  selector: 'cms-new-code-project-modal',
  templateUrl: './new-code-project.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './new-code-project.component.scss',
  ]
})
export class NewCodeProjectDialogComponent implements OnInit {
  environments = [];

  constructor(
    public dialogRef: MatDialogRef<NewCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
  ) {}

  ngOnInit(): void {
    this.environmentEmulatorRepository.getEnvironments().subscribe((data) => {
      this.environments = data as any;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onCreate() {
    this.dialogRef.close(this.model);
  }
}
