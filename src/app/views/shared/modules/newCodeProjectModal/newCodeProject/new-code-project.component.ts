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
  descriptionLen: number;
  nameLen: number;

  httpFail: string = null;
  inFlight: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any,
    private codeProjectsRepository: CodeProjectsRepository,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
  ) {}

  ngOnInit(): void {
    this.descriptionLen = this.model.description.length;
    this.nameLen = this.model.name.length;

    this.environmentEmulatorRepository.getEnvironments().subscribe((data) => {
      if (this.model.environment) {
        this.selected = this.model.environment.name;
      }

      this.environments = data as any;
    });
  }

  onDescriptionChanged(): void {
    this.descriptionLen = this.model.description.length;
  }

  onNameChanged(): void {
    this.nameLen = this.model.name.length;
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

    if (!this.model.doHttpAction) {
      return this.dialogRef.close(this.model);
    }

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
