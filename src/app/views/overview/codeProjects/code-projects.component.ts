import {Component, OnInit} from '@angular/core';
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";
import {CodeProjectAppModel} from "../../../model/app/codeEditor/CodeProjectAppModel";

@Component({
  selector: 'cms-code-project-overview',
  styleUrls: [
    './code-projects.component.scss',
  ],
  templateUrl: './code-projects.component.html',
})
export class CodeProjectsComponent implements OnInit {
  listing: CodeProjectAppModel[] = [];

  constructor(
    private codeProjectsRepository: CodeProjectsRepository
  ) {}

  ngOnInit(): void {
    this.codeProjectsRepository.getProjects(10, 1).subscribe((codeProjects: CodeProjectHttpModel[]) => {
      for (const codeProject of codeProjects) {
        this.listing.push(codeProject.convertToAppModel());
      }
    });
  }
}
