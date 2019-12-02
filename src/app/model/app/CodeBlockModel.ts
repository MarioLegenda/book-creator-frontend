import {IViewModel} from "./IViewModel";

export class CodeBlockModel implements IViewModel {
  constructor(
    public pageUuid: string,
    public text: string = '',
  ) {}
}
