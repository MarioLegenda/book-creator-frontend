import {IBlock} from "./IBlock";

export interface IPageData {
  uuid: string;
  shortId: string;
  blocks: IBlock[];
}
