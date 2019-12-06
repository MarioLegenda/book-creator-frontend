import {Component, Input} from '@angular/core';
import {faAngleDown, faAngleRight, faFile, faFolder} from "@fortawesome/free-solid-svg-icons";

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
      dirCaret: faAngleRight,
      newFile: faFile,
      newDir: faFolder,
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
      this.componentState.icons.dirCaret = faAngleRight;

      this.componentState.expanded = false;

      return;
    }

    if (!this.componentState.expanded) {
      this.componentState.icons.dirCaret = faAngleDown;

      this.componentState.expanded = true;
    }
  }
}
