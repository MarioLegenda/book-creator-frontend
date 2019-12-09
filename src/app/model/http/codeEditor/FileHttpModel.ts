import {FileAppModel} from "../../app/codeEditor/FileAppModel";

export class FileHttpModel {
  public readonly type: string;
  public readonly name: string;
  public readonly directoryId: string;
  public readonly content: string;
  public readonly id: string;

  constructor(
    type: string,
    name: string,
    id: string,
    directoryId: string,
    content: string = '',
  ) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.content = content;
    this.directoryId = directoryId;
  }

  convertToAppModel(): FileAppModel {
    return new FileAppModel(
      this.name,
      this.directoryId,
      this.content,
      this.type,
    );
  }
}
