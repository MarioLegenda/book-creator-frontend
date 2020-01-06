import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {PageContext} from "./PageContext";
import {PageRepository} from "../../../repository/PageRepository";
import {BlogRepository} from "../../../repository/BlogRepository";
import {actionTypes, viewAddAllBlocks} from "../../../store/page/viewActions";
import {IPage} from "./IPage";
import {IKnowledgeSource} from "./IKnowledgeSource";

@Injectable({
  providedIn: 'root',
})
export class PageContextInitializer {
  private context: PageContext;

  private contextInitiated = false;

  constructor(
    private blogRepository: BlogRepository,
    private pageRepository: PageRepository,
    private store: Store<any>,
  ) {}

  initContext(activatedRoute: ActivatedRoute) {
    const pageShortId = activatedRoute.snapshot.paramMap.get('pageShortId');
    const sourceShortId = activatedRoute.snapshot.paramMap.get('sourceShortId');
    const type = activatedRoute.snapshot.paramMap.get('type');

    this.contextInitiated = true;

    this.createContext(type, sourceShortId, pageShortId).then((data: any) => {
      this.dispatchTextBlocks(data);
    });
  }

  getContext(): PageContext {
    return this.context;
  }

  private dispatchTextBlocks(
    data: any
  ) {
    this.context = data.context;

    const blocks = data.blocks;

    this.store.dispatch(viewAddAllBlocks({
      type: actionTypes.VIEW_ADD_ALL_BLOCKS,
      blocks,
    }));
  }

  private async createContext(type: string, sourceShortId: string, pageShortId: string) {
    const pageData = await this.getPageByShortId(pageShortId);

    const knowledgeSource: IKnowledgeSource = await this.getKnowledgeSourceByShortId(type, sourceShortId);

    const page: IPage = {
      uuid: pageData.uuid,
      shortId: pageData.shortId,
    };

    const context: PageContext = new PageContext(
      knowledgeSource,
      page,
    );

    return {
      context: context,
      blocks: pageData.blocks,
    }
  }

  private async getPageByShortId(shortId: string) {
    const uuidModel: any = await this.pageRepository.findUuidByShortId(shortId).toPromise();

    return await this.pageRepository.getPageByUuid(uuidModel.data.uuid).toPromise();
  }

  private async getKnowledgeSourceByShortId(type: string, shortId: string) {
    if (type === 'blog') {
      const uuid: any = await this.blogRepository.getUuid(shortId).toPromise();
      const blog: any = await this.blogRepository.getBlog(uuid.data.uuid).toPromise();

      return {
        uuid: blog.data.uuid,
        name: blog.data.name,
        shortId: blog.data.shortId,
        type: type,
      };
    }
  }
}
