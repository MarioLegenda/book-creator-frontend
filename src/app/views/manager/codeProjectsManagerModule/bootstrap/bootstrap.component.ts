import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICodeProject} from "../../../codeEditor/models/ICodeProject";
import {CodeProjectsRepository} from "../../../../repository/CodeProjectsRepository";
import {ActivatedRoute} from "@angular/router";
import {CodeProjectObservable} from "../services/CodeProjectObservable";

@Component({
  selector: 'cms-code-projects-manager-bootstrap',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit, OnDestroy {
  project: ICodeProject;

  constructor(
    private codeProjectsRepository: CodeProjectsRepository,
    private route: ActivatedRoute,
    private codeProjectObservable: CodeProjectObservable
  ) {}

  ngOnInit() {
    this.bootstrap().then((codeProject: ICodeProject) => {
      this.project = codeProject;

      this.codeProjectObservable.emit(codeProject);
    });
  }

  ngOnDestroy(): void {
  }

  private async bootstrap(): Promise<ICodeProject> {
    return await this.codeProjectsRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).toPromise();
  }
}
