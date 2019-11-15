import {IRequestModel} from "./IRequestModel";

export class TextBlockModel implements IRequestModel{
  data: any = {};

  public static create(
    internalName: string = '',
    shortDescription: string = '',
    text: string = '',
    pageUuid: string = '',
  ): TextBlockModel {
    const model = new TextBlockModel();

    model.data.text = (!text) ? '' : text;
    model.data.internalName = (!internalName) ? '' : internalName;
    model.data.shortDescription = (!shortDescription) ? '' : shortDescription;
    model.data.pageUuid = (!pageUuid) ? '' : pageUuid;

    return model;
  }
}
