export class DirectoryAppModel {
  codeProjectUuid: string;
  name: string;
  directoryId: string;
  structure: any[];
  depth: number;
  type: string;
  isRoot: boolean;

  constructor(
    codeProjectUuid: string,
    name: string,
    directoryId: string,
    depth: number,
    type: string,
    isRoot: boolean,
    structure: any[] = [],
  ) {
    this.codeProjectUuid = codeProjectUuid;
    this.name = name;
    this.directoryId = directoryId;
    this.structure = structure;
    this.depth = depth;
    this.type = type;
    this.isRoot = isRoot;
  }
}
