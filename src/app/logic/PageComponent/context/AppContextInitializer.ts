import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppContext} from "./AppContext";
import {PageRepository} from "../../../repository/PageRepository";
import {BlogRepository} from "../../../repository/BlogRepository";
import {actionTypes, viewAddAllBlocks} from "../../../store/page/viewActions";
import {IPage} from "./IPage";
import {IBlogSource} from "./IBlogSource";
import {ReplaySubject, Subject} from "rxjs";
import {IPageData} from "./IPageData";

@Injectable({
  providedIn: 'root',
})
export class AppContextInitializer {
  private context: AppContext;

  private whenSubject: Subject<any> = new ReplaySubject();
  private whenSubscriber;
  private whenFns: Function[] = [];

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

    this.createContext(type, sourceShortId, pageShortId).then((data: any) => {
      this.contextInitiated = true;
      this.context = data.context;

      this.dispatchAllBlocks(data);

      this.whenSubscriber = this.whenSubject.subscribe((fn: Function) => {
        fn.call(null, this.context);
      });
    });
  }

  getContext(): AppContext {
    return this.context;
  }

  isInitialized(): boolean {
    return this.contextInitiated;
  }

  whenInit(fn: Function) {
    if (this.isInitialized()) {
      fn.call(null, this.context);

      return;
    }

    this.whenSubject.next(fn);
  }

  destroy() {
    this.whenSubscriber.unsubscribe();
    this.whenFns = [];
    this.context = null;
    this.contextInitiated = false;
  }

  private dispatchAllBlocks(
    data: any
  ) {
    const blocks = data.blocks;

    this.store.dispatch(viewAddAllBlocks({
      type: actionTypes.VIEW_ADD_ALL_BLOCKS,
      blocks,
    }));
  }

  private async createContext(type: string, sourceShortId: string, pageShortId: string) {
    const pageData: IPageData = await this.getPageByShortId(pageShortId);

    const knowledgeSource: IBlogSource = await this.getKnowledgeSourceByShortId(type, sourceShortId);

    const page: IPage = {
      uuid: pageData.uuid,
      shortId: pageData.shortId,
    };

    const context: AppContext = new AppContext(
      knowledgeSource,
      page,
    );

    return {
      context: context,
      blocks: pageData.blocks,
    }
  }

  private async getPageByShortId(shortId: string): Promise<IPageData> {
    const uuidModel: any = await this.pageRepository.findUuidByShortId(shortId).toPromise();

    if (uuidModel) {
      return await this.pageRepository.getPageByUuid(uuidModel.data.uuid).toPromise();
    }
  }

  private async getKnowledgeSourceByShortId(type: string, shortId: string) {
    if (type === 'blog') {
      const uuid: any = await this.blogRepository.getUuid(shortId).toPromise();

      if (uuid) {
        const blog: any = await this.blogRepository.getBlog(uuid.data.uuid).toPromise();

        return {
          uuid: blog.data.uuid,
          title: blog.data.title,
          description: blog.data.description,
          cover: blog.data.cover,
          shortId: blog.data.shortId,
          codeProject: blog.data.codeProjects,
          state: blog.data.state,
          type: type,
        };
      }
    }
  }
}
