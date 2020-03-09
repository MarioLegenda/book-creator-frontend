import {IBlogSource} from "./IBlogSource";
import {IPage} from "./IPage";

export class AppContext {
  constructor(
    public knowledgeSource: IBlogSource,
    public page: IPage,
  ) {}

  updateSource(prop: string, value: any) {
    this.knowledgeSource[prop] = value;
  }
}
