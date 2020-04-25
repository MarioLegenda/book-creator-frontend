import {IEnvironment} from "./IEnvironment";
import {ISession} from "./ISession";

export interface ICodeProject {
  uuid: string;
  shortId: string;
  name: string;
  accountUuid: string;
  createdAt: string;
  description: string;
  extension: string;
  session?: ISession;
  environment: IEnvironment;
  updatedAt?: string;
}
