import {IDirectory} from "./IDirectory";

export interface IRemoveDirectoryEvent {
  directory: IDirectory,
  sendDirectoryEmptied: boolean,
}
