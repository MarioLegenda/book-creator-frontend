import {Component, OnInit} from '@angular/core';
import {ProjectRepository} from "../../../repository/ProjectRepository";
import {ActivatedRoute} from "@angular/router";
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";
import {CodeProjectAppModel} from "../../../model/app/codeEditor/CodeProjectAppModel";

@Component({
  selector: 'cms-code-editor',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit {
  project: CodeProjectAppModel;

  constructor(
    private projectRepository: ProjectRepository,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.projectRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).subscribe((model: CodeProjectHttpModel) => {
      this.project = model.convertToAppModel();
    });
  }
}
