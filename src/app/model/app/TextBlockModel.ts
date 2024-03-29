import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class TextBlockModel {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public text: string,
    public position: number,
    public internalName: string,
    public comment: string,
    public blockType: string = ComponentType.TEXT_BLOCK_TYPE,
  ) {}
}
