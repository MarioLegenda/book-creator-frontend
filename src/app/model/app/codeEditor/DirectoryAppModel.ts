import {FileAppModel} from "./FileAppModel";

export class DirectoryAppModel {
  name: string;
  directoryId: string;
  structure: any[];
  depth: number;
  type: string;
  isRoot: boolean;

  constructor(
    name: string,
    directoryId: string,
    depth: number,
    type: string,
    isRoot: boolean,
    structure: any[] = [],
  ) {
    this.name = name;
    this.directoryId = directoryId;
    this.structure = structure;
    this.depth = depth;
    this.type = type;
    this.isRoot = isRoot;
  }
}
