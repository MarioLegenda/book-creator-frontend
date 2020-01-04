import {TextBlockModel as ViewTextBlockModel} from "../app/TextBlockModel";
import {IViewModel} from "../app/IViewModel";
import {IRequestModel} from "../IRequestModel";

export class TextBlockModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    return new ViewTextBlockModel(
      this.data.blockUuid,
      this.data.position,
      this.data.text,
    );
  }

  public static create(
    pageUuid: string,
    blockUuid: string,
    position: number,
    text: string = '',
  ): TextBlockModel {
    const model = new TextBlockModel();

    model.data.position = position;
    model.data.pageUuid = pageUuid;
    model.data.blockUuid = blockUuid;
    model.data.text = (!text) ? '' : text;

    return model;
  }
}
