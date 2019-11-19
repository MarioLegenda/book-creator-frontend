import {IViewModel} from "./IViewModel";

export class TextBlockModel implements IViewModel{
  constructor(
    public blockUuid: string,
    public internalName: string = '',
    public shortDescription: string = '',
    public text: string = '',
  ) {}
}
