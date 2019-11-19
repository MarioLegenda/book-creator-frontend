import {IRequestModel} from "./IRequestModel";
import {IViewModel} from "../app/IViewModel";

export class RemoveBlockModel implements IRequestModel {
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. RemoveBlockModel cannot be converted to a view model');
  }

  constructor(
    public pageUuid: string,
    public blockUuid: string
  ) {
    this.data.pageUuid = pageUuid;
    this.data.blockUuid = blockUuid;
  }
}
