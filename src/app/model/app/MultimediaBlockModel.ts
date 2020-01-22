import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class MultimediaBlockModel {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public position: string,
    public fileInfo: any,
    public blockType: string = ComponentType.MULTIMEDIA_BLOCK_TYPE,
  ) {}
}
