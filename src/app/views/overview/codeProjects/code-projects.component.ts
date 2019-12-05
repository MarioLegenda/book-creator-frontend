import {Component, OnInit} from '@angular/core';
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {CodeProjectModel} from "../../../model/http/CodeProjectModel";

@Component({
  selector: 'cms-code-project-overview',
  styleUrls: [
    './code-projects.component.scss',
  ],
  templateUrl: './code-projects.component.html',
})
export class CodeProjectsComponent implements OnInit {
  listing: CodeProjectModel[];

  constructor(
    private codeProjectsRepository: CodeProjectsRepository
  ) {}

  ngOnInit(): void {
    this.codeProjectsRepository.getProjects(10, 1).subscribe((listing: CodeProjectModel[]) => {
      this.listing = listing;
    });
  }
}
