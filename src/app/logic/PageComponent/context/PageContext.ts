import {IKnowledgeSource} from "./IKnowledgeSource";
import {IPage} from "./IPage";

export class PageContext {
  constructor(
    public knowledgeSource: IKnowledgeSource,
    public page: IPage,
  ) {}
}
