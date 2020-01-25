import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class MultimediaBlockModel {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public fileInfo: any,
    public unsplash: string,
    public position: number,
    public blockType: string = ComponentType.MULTIMEDIA_BLOCK_TYPE,
  ) {}
}
