import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-file',
  styleUrls: [
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent {
  @Input('file') file;
  @Input('depth') depth;

  componentState = {
    showed: false,
    fileStyles: {
      'padding-left': '20px',
    },
    icons: {
      fileIcon: 'fas fa-jedi'
    }
  };

  ngOnInit() {
    if (this.depth === 1) {
      this.componentState.fileStyles['padding-left'] = `${(parseInt(this.depth)) * 35}px`;
    } else if (this.depth > 1) {
      this.componentState.fileStyles['padding-left'] = `${(parseInt(this.depth)) * 25}px`;
    }
  }

  showFile() {
  }
}
