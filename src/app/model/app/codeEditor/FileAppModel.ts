export class FileAppModel {
  public name: string;
  public id: string;
  public content: string;
  public directoryId: string;
  public type: string;

  constructor(
    name: string,
    id: string,
    directoryId: string,
    content: string,
    type: string,
  ) {
    this.id = id;
    this.name = name;
    this.directoryId = directoryId;
    this.content = content;
    this.type = type;
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
