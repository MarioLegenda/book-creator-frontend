export class FileAppModel {
  public name: string;
  public id: string;
  public content: string;
  public directoryId: string;
  public type: string;
  public depth: number;

  constructor(
    name: string,
    id: string,
    directoryId: string,
    content: string,
    type: string,
    depth: number,
  ) {
    this.id = id;
    this.name = name;
    this.directoryId = directoryId;
    this.content = content;
    this.type = type;
    this.depth = depth;
  }

  getExtension(): string {
    return this.name.split(".")[1];
  }

  isJavascript(): boolean {
    return this.getExtension() === 'js';
  }

  createNewFileHttpModel(): object {
    return {
      data: {
        name: this.name,
        directoryId: this.directoryId,
        content: '',
      }
    }
  }
}
