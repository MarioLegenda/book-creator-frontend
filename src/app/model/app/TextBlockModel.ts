import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class TextBlockModel {
  constructor(
    public blockUuid: string,
    public position: number,
    public shortId: string,
    public text: string,
    public blockType: string = ComponentType.TEXT_BLOCK_TYPE,
  ) {}
}
