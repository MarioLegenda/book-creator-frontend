export class PageContext {
  constructor(
    public uuid: string,
    public shortId: string,
    public internalName: string = '',
    public shortDescription: string = '',
  ) {

  }
}
