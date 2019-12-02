import {IRequestModel} from "./IRequestModel";
import {IViewModel} from "../app/IViewModel";
import {CodeBlockModel} from "../app/CodeBlockModel";

export class CreateCodeBlock implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    return new CodeBlockModel(
      this.data.pageUuid,
      this.data.text,
    )
  }

  public static create(
    pageUuid: string,
    text: string = '',
  ): CreateCodeBlock {
    const model = new CreateCodeBlock();

    model.data.pageUuid = pageUuid;
    model.data.text = (!text) ? '' : text;

    return model;
  }
}
