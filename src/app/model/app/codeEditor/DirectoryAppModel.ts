export class DirectoryAppModel {
  codeProjectUuid: string;
  name: string;
  directoryId: string;
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
  ) {
    this.codeProjectUuid = codeProjectUuid;
    this.name = name;
    this.directoryId = directoryId;
    this.depth = depth;
    this.type = type;
    this.isRoot = isRoot;
  }
}
