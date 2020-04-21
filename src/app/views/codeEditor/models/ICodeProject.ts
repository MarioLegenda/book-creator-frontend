import {IEnvironment} from "./IEnvironment";

export interface ICodeProject {
  uuid: string;
  shortId: string;
  name: string;
  accountUuid: string;
  createdAt: string;
  description: string;
  extension: string;
  environment: IEnvironment;
  updatedAt?: string;
}
