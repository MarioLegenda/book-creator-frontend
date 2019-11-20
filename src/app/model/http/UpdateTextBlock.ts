import {IRequestModel} from "./IRequestModel";
import {TextBlockModel as ViewTextBlockModel} from "../app/TextBlockModel";
import {IViewModel} from "../app/IViewModel";

export class UpdateTextBlock implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. RemoveBlockModel cannot be converted to a view model');
  }

  public static create(
    pageUuid: string,
    blockUuid: string,
    internalName: string = '',
    shortDescription: string = '',
    text: string = '',
  ): UpdateTextBlock {
    const model = new UpdateTextBlock();

    model.data.pageUuid = pageUuid;
    model.data.blockUuid = blockUuid;
    model.data.text = (!text) ? '' : text;
    model.data.internalName = (!internalName) ? '' : internalName;
    model.data.shortDescription = (!shortDescription) ? '' : shortDescription;

    return model;
  }
}
