import {IRequestModel} from "./IRequestModel";
import {IViewModel} from "../app/IViewModel";

export class CreateTextBlockModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. CreateTextBlockModel cannot be converted to a view model');
  }

  public static create(
    pageUuid: string,
    internalName: string = '',
    shortDescription: string = '',
    text: string = '',
  ): CreateTextBlockModel {
    const model = new CreateTextBlockModel();

    model.data.pageUuid = pageUuid;
    model.data.text = (!text) ? '' : text;
    model.data.internalName = (!internalName) ? '' : internalName;
    model.data.shortDescription = (!shortDescription) ? '' : shortDescription;

    return model;
  }
}
