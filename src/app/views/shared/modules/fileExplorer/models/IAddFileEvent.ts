import {IDirectory} from "./IDirectory";
import {IFile} from "./IFile";

export interface IAddFileEvent {
  readonly parent: IDirectory;
  readonly file: IFile;
}
