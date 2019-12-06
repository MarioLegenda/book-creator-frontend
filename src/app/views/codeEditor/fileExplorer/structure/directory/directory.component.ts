import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-directory',
  styleUrls: [
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent {
  @Input('directory') directory;

  componentState = {
    expanded: false,
    hovered: false,
    dirStyles: {},
    icons: {
      dirCaret: 'fas fa-angle-right',
      newFile: 'far fa-file',
      newDir: 'far fa-folder',
    },
  };

  ngOnInit() {
    this.componentState.dirStyles['padding-left'] = `${(parseInt(this.directory.depth)) * 15}px`
  }

  isDirectory(entry) {
    return entry.type === 'directory';
  }

  isFile(entry) {
    return entry.type === 'file';
  }

  expandDirectory() {
    if (this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-right';

      this.componentState.expanded = false;

      return;
    }

    if (!this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-down';

      this.componentState.expanded = true;
    }
  }
}
