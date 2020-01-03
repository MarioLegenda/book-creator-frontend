import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import { CodeProjectAppModel } from 'src/app/model/app/codeEditor/CodeProjectAppModel';

@Component({
  selector: 'cms-code-project-item',
  styleUrls: [
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input('item') item: CodeProjectAppModel;

  constructor(
    private router: Router,
  ) {}

  goToEditor() {
    this.router.navigate([
      '/cms/code-editor',
      this.item.shortId,
    ]);
  }

  goToManager() {
    this.router.navigate([
      '/cms/managment/code-projects',
      this.item.shortId,
    ]);
  }
}
