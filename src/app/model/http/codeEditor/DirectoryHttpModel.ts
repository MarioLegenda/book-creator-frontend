import {DirectoryAppModel} from "../../app/codeEditor/DirectoryAppModel";

export class DirectoryHttpModel {
  public readonly id: string;
  public readonly name: string;
  public readonly isRoot: boolean;
  public readonly codeProjectUuid: string;
  public readonly type: string;
  public readonly parent: string;
  public readonly depth: number;

  constructor(
    id: string,
    name: string,
    isRoot: boolean,
    codeProjectUuid: string,
    depth: number,
    parent: string = null,
  ) {
    this.type = 'directory';
    this.id = id;
    this.isRoot = isRoot;
    this.name = name;
    this.codeProjectUuid = codeProjectUuid;
    this.parent = parent;
    this.depth = depth;
  }

  convertToAppModel(codeProjectUuid: string): DirectoryAppModel {
    return new DirectoryAppModel(
      codeProjectUuid,
      this.name,
      this.id,
      this.depth,
      this.type,
      this.isRoot,
    );
  }
}
