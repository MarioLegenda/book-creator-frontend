import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class MainHeaderBlock {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public text: string,
    public position: number,
    public blockType: string = ComponentType.MAIN_HEADER_BLOCK,
  ) {}
}
