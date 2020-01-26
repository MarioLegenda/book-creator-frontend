import {Component, OnInit} from '@angular/core';
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";
import {HttpModel} from "../../../model/http/HttpModel";

@Component({
  selector: 'cms-code-project-overview',
  styleUrls: [
    './code-projects.component.scss',
  ],
  templateUrl: './code-projects.component.html',
})
export class CodeProjectsComponent implements OnInit {
  items = [];
  paginationPossible = false;

  readonly size: number = 10;
  private currentPage: number = 1;
  private searchTerm: string = null;

  constructor(
    private codeProjectsRepository: CodeProjectsRepository
  ) {}

  ngOnInit(): void {
    this.getInitialItems();
  }


  onItemDeleted(item) {
    const idx: number = this.items.findIndex((val) => {
      return val.uuid === item.uuid;
    });

    this.items.splice(idx, 1);
  }

  private getInitialItems() {
    this.codeProjectsRepository.getProjects(this.size, this.currentPage).subscribe((res) => {
      this.items = res;

      if (this.items.length >= this.size) {
        this.paginationPossible = true;
      }

      if (this.items.length === 0) {
        this.paginationPossible = false;
      }
    });
  }

}
