import {Component, Input} from '@angular/core';
import {DirectoryRepository} from "../../../../repository/DirectoryRepository";
import {CodeProjectAppModel} from "../../../../model/app/codeEditor/CodeProjectAppModel";
import {DirectoryHttpModel} from "../../../../model/http/codeEditor/DirectoryHttpModel";

@Component({
  selector: 'cms-structure',
  styleUrls: [
    './structure.component.scss',
  ],
  templateUrl: './structure.component.html',
})
export class StructureComponent {
  structure = [];

  @Input('project') project: CodeProjectAppModel;

  constructor(
    private directoryRepository: DirectoryRepository
  ) {}

  isDirectory(entry): boolean {
    return entry.type === 'directory';
  }

  isFile(entry): boolean {
    return entry.type === 'file';
  }

  ngOnInit() {
    this.directoryRepository.getRootDirectory(this.project.uuid).subscribe((model: DirectoryHttpModel) => {
      this.structure.push(model.convertToAppModel(this.project.uuid));
    });
  }
}
