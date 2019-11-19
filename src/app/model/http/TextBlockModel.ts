import {IRequestModel} from "./IRequestModel";
import {TextBlockModel as ViewTextBlockModel} from "../app/TextBlockModel";
import {IViewModel} from "../app/IViewModel";

export class TextBlockModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    return new ViewTextBlockModel(
      this.data.blockUuid,
      this.data.internalName,
      this.data.shortDescription,
      this.data.text,
    );
  }

  public static create(
    pageUuid: string,
    blockUuid: string,
    internalName: string = '',
    shortDescription: string = '',
    text: string = '',
  ): TextBlockModel {
    const model = new TextBlockModel();

    model.data.pageUuid = pageUuid;
    model.data.blockUuid = blockUuid;
    model.data.text = (!text) ? '' : text;
    model.data.internalName = (!internalName) ? '' : internalName;
    model.data.shortDescription = (!shortDescription) ? '' : shortDescription;

    return model;
  }
}
