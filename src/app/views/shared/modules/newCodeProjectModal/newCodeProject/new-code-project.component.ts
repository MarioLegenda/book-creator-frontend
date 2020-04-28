import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EnvironmentEmulatorRepository} from "../../../../../repository/EnvironmentEmulatorRepository";
import {HttpModel} from "../../../../../model/http/HttpModel";
import {CodeProjectsRepository} from "../../../../../repository/CodeProjectsRepository";
import {ErrorCodes} from "../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-new-code-project-modal',
  templateUrl: './new-code-project.component.html',
  styleUrls: [
    '../../../../../main/global-dialog.component.scss',
    './new-code-project.component.scss',
  ]
})
export class NewCodeProjectDialogComponent implements OnInit {
  environments = null;
  selected = '';

  httpFail: string = null;
  inFlight: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private codeProjectsRepository: CodeProjectsRepository,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
  ) {}

  ngOnInit(): void {
    this.environmentEmulatorRepository.getEnvironments().subscribe((data) => {
      if (this.model.environment) {
        this.selected = this.model.environment.name;
      }

      this.environments = data as any;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onCreate() {
    this.httpFail = null;
    this.inFlight = true;

    let chosen = null;
    for (const env of this.environments) {
      if (env.name === this.selected) {
        chosen = env;

        break;
      }
    }

    this.model.environment = chosen;

    this.codeProjectsRepository.createCodeProject(HttpModel.createCodeProject(
      this.model.name,
      this.model.description,
      this.model.environment,
    )).subscribe((codeProject: any) => {
      this.dialogRef.close(codeProject);
    }, () => {
      this.httpFail = 'Code project could not be created. Please, try again later';
    })
  }
}
