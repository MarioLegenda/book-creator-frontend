import {Type} from "./Type";

export interface IResponse {
  status: number;
  type: Type;
  method: string;
  errorCode?: number
  data: any;
}
