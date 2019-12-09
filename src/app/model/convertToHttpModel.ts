import {IRequestModel} from "./IRequestModel";

export function convertToRequestModel(model): IRequestModel {
  return {
    data: model,
  }
}
