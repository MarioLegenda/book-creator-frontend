import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'cms-file-tabs',
  styleUrls: [
    './file-tab.component.scss',
  ],
  templateUrl: './file-tab.component.html',
})
export class FileTabComponent {
  tabs: [];

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorActions')).subscribe((action) => {
      console.log(action);
    });
  }
}
