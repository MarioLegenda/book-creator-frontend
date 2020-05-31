import {IFile} from "./IFile";
import {IDirectory} from "./IDirectory";

export interface ISearchEvent {
  files: IFile[];
  directories: IDirectory[];
  isEmpty: boolean;
  restart: boolean;
}
