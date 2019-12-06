import {Component} from '@angular/core';
import {faClone} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent {
  componentState = {
    icons: {
      selectProject: faClone,
    },
    projectName: 'project name',
    fileStructure: [
      {
        type: 'directory',
        depth: 1,
        name: 'level1',
        files: [
          {type: 'file', name: 'level1file1.js'},
          {type: 'file', name: 'level1file2.js'},
          {type: 'file', name: 'level1file3.js'},
          {type: 'file', name: 'level1file4.js'},
          {type: 'file', name: 'level1file5.js'},
          {
            type: 'directory',
            name: 'level2',
            depth: 2,
            files: [
              {type: 'file', name: 'level2file1.js'},
              {type: 'file', name: 'level2file2.js'},
              {type: 'file', name: 'level2file3.js'},
              {type: 'file', name: 'level2file4.js'},
            ]
          }
        ]
      },
      {type: 'file', name: 'file1.js'},
      {type: 'file', name: 'file2.js'},
      {type: 'file', name: 'file3.js'},
      {type: 'file', name: 'file4.js'},
      {type: 'file', name: 'file5.js'},
      {type: 'file', name: 'file6.js'},
      {type: 'file', name: 'file7.js'},
      {type: 'file', name: 'file8.js'},
    ],
  };
}
