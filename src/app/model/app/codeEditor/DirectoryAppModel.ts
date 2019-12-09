import {FileAppModel} from "./FileAppModel";

export class DirectoryAppModel {
  name: string;
  directoryId: string;
  files: FileAppModel[];
  depth: number;
  type: string;
  isRoot: boolean;

  constructor(
    name: string,
    directoryId: string,
    depth: number,
    type: string,
    isRoot: boolean,
    files: FileAppModel[] = [],
  ) {
    this.name = name;
    this.directoryId = directoryId;
    this.files = files;
    this.depth = depth;
    this.type = type;
    this.isRoot = isRoot;
  }
}
