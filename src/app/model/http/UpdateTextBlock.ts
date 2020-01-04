import {IViewModel} from "../app/IViewModel";
import {IRequestModel} from "../IRequestModel";

export class UpdateTextBlock implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. RemoveBlockModel cannot be converted to a view model');
  }

  public static create(
    pageUuid: string,
    blockUuid: string,
    position: number,
    text: string = '',
  ): UpdateTextBlock {
    const model = new UpdateTextBlock();

    model.data.position = position;
    model.data.pageUuid = pageUuid;
    model.data.blockUuid = blockUuid;
    model.data.text = (!text) ? '' : text;

    return model;
  }
}
