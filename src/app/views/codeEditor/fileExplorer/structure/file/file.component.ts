import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {FileRepository} from "../../../../../repository/FileRepository";

@Component({
  selector: 'cms-file',
  styleUrls: [
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit {
  @Input('file') file: FileAppModel;
  @Input('depth') depth: number;
  @Output('fileRemoved') fileRemoved = new EventEmitter();

  constructor(
    private fileRepository: FileRepository
  ) {}

  componentState = {
    showed: false,
    fileStyles: {
      'padding-left': '20px',
    },
    icons: {
      removeFile: 'far fa-trash-alt',
    }
  };

  ngOnInit() {
    if (this.depth === 1) {
      this.componentState.fileStyles['padding-left'] = `${this.depth * 35}px`;
    } else if (this.depth > 1) {
      this.componentState.fileStyles['padding-left'] = `${this.depth * 25}px`;
    }
  }

  removeFile() {
    this.fileRepository.removeFileById({
      data: {
        fileId: this.file.id,
      }
    }).subscribe(() => {
      this.fileRemoved.emit(this.file);
    })
  }
}
