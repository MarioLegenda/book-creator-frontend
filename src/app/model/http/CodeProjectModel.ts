export class CodeProjectModel {
  public readonly uuid: string;
  public readonly shortId: string;
  public readonly sourceId: string;
  public name: string;
  public description: string;

  constructor(
    uuid: string,
    shortId: string,
    sourceId: string,
    name: string,
    description: string = ''
  ) {
    this.uuid = uuid;
    this.shortId = shortId;
    this.sourceId = sourceId;
    this.name = name;
    this.description = description;
  }
}
