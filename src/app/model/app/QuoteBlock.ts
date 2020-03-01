import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class QuoteBlock {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public text: string,
    public position: number,
    public blockType: string = ComponentType.QUOTE_BLOCK,
  ) {}
}
