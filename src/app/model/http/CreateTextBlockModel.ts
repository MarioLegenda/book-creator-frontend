import {IRequestModel} from "./IRequestModel";
import {TextBlockModel as ViewTextBlockModel} from "../app/TextBlockModel";
import {IViewModel} from "../app/IViewModel";

export class CreateTextBlockModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    return new ViewTextBlockModel(
      this.data.blockUuid,
      this.data.internalName,
      this.data.shortDescription,
      this.data.text
    );
  }

  public static create(
    pageUuid: string,
    internalName: string = '',
    shortDescription: string = '',
    text: string = '',
  ): CreateTextBlockModel {
    const model = new CreateTextBlockModel();

    model.data.text = (!text) ? '' : text;
    model.data.internalName = (!internalName) ? '' : internalName;
    model.data.shortDescription = (!shortDescription) ? '' : shortDescription;
    model.data.pageUuid = (!pageUuid) ? '' : pageUuid;

    return model;
  }
}
