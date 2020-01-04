import {IViewModel} from "./IViewModel";

export class TextBlockModel implements IViewModel{
  constructor(
    public blockUuid: string,
    public position: number,
    public text: string = '',
  ) {}
}
