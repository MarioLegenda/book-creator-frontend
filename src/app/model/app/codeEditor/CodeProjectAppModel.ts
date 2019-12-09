export class CodeProjectAppModel {
  public uuid: string;
  public shortId: string;
  public sourceId: string;
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
