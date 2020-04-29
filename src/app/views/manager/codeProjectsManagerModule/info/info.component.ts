import {Component} from '@angular/core';
import {CodeProjectObservable} from "../services/CodeProjectObservable";
import {ICodeProject} from "../../../codeEditor/models/ICodeProject";

@Component({
  selector: 'cms-cp-info',
  styleUrls: [
    './info.component.scss',
  ],
  templateUrl: './info.component.html',
})
export class InfoComponent {
  project: ICodeProject;

  constructor(
    private codeProjectObservable: CodeProjectObservable
  ) {
  }

  ngOnInit() {
    this.codeProjectObservable.subscribe((codeProject: ICodeProject) => {
      this.project = codeProject;
    });
  }
}
