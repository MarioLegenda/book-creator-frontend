import {IViewModel} from "../app/IViewModel";

export interface IRequestModel {
  data: any,
  convertToViewModel(): IViewModel,
}
