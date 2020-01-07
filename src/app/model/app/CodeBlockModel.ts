import {IViewModel} from "./IViewModel";
import {ComponentType} from "../../logic/PageComponent/ComponentType";

export class CodeBlockModel {
  constructor(
    public blockUuid: string,
    public shortId: string,
    public position: string,
    public text: string,
    public blockType: string = ComponentType.CODE_BLOCK_TYPE,
  ) {}
}
