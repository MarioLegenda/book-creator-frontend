import {IViewModel} from "../app/IViewModel";
import {IRequestModel} from "../IRequestModel";

export class CreateTextBlockModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. CreateTextBlockModel cannot be converted to a view model');
  }

  public static create(
    pageUuid: string,
    position: number,
    text: string = '',
  ): CreateTextBlockModel {
    const model = new CreateTextBlockModel();

    model.data.pageUuid = pageUuid;
    model.data.text = (!text) ? '' : text;
    model.data.position = position;

    return model;
  }
}
