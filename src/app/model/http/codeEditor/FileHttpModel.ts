import {FileAppModel} from "../../app/codeEditor/FileAppModel";

export class FileHttpModel {
  public readonly type: string;
  public readonly name: string;
  public readonly directoryId: string;
  public readonly content: string;
  public readonly id: string;
  public readonly depth: number;

  constructor(
    type: string,
    name: string,
    id: string,
    directoryId: string,
    depth: number,
    content: string = '',
  ) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.content = content;
    this.directoryId = directoryId;
    this.depth = depth;
  }

  convertToAppModel(fileId: string): FileAppModel {
    return new FileAppModel(
      this.name,
      fileId,
      this.directoryId,
      this.content,
      this.type,
      this.depth,
    );
  }
}
