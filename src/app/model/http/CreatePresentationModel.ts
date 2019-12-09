import {IViewModel} from "../app/IViewModel";
import {PresentationCreateModel} from "../../views/selection/presentation/create/services/PresentationCreateModel";
import {IRequestModel} from "../IRequestModel";

export class CreatePresentationModel implements IRequestModel{
  data: any = {};

  public convertToViewModel(): IViewModel {
    throw new Error('Internal error. CreateTextBlockModel cannot be converted to a view model');
  }

  public static create(
    name: string,
    shortDescription: string,
    uuid: string = null,
    longDescription: string = null,
  ): CreatePresentationModel {
    const model = new CreatePresentationModel();

    model.data.name = name;
    model.data.shortDescription = shortDescription;
    model.data.uuid = (!uuid) ? null: uuid;
    model.data.longDescription = (!longDescription) ? null : longDescription;

    return model;
  }
}
