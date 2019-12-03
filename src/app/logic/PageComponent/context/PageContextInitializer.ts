import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {PageContext} from "./PageContext";
import {PageRepository} from "../../../repository/PageRepository";
import {TextBlockModel} from "../../../model/http/TextBlockModel";
import {actionTypes, viewAddTextBlock} from "../../../store/viewActions";
import {IPage} from "./IPage";
import {PresentationRepository} from "../../../repository/PresentationRepository";
import {IKnowledgeSource} from "./IKnowledgeSource";

@Injectable({
  providedIn: 'root',
})
export class PageContextInitializer {
  private context: PageContext;

  private contextInitiated = false;

  constructor(
    private pageRepository: PageRepository,
    private presentationRepository: PresentationRepository,
    private store: Store<any>,
  ) {}

  initContext(activatedRoute: ActivatedRoute) {
    const pageShortId = activatedRoute.snapshot.paramMap.get('pageShortId');
    const sourceShortId = activatedRoute.snapshot.paramMap.get('sourceShortId');
    const type = activatedRoute.snapshot.paramMap.get('type');

    this.createContext(type, sourceShortId, pageShortId).then((data: any) => {
      this.context = data.context;

      const blocks: TextBlockModel[] = data.blocks;

      for (const block of blocks) {
        this.store.dispatch(viewAddTextBlock({
          type: actionTypes.VIEW_ADD_TEXT_BLOCK,
          ...block.convertToViewModel()
        }));
      }
    });

    this.contextInitiated = true;
  }

  getContext(): PageContext {
    return this.context;
  }

  private async createContext(type: string, sourceShortId: string, pageShortId: string) {
    const pageData = await this.getPageByShortId(pageShortId);

    const knowledgeSource: IKnowledgeSource = await this.getKnowledgeSourceByShortId(type, sourceShortId);

    const page: IPage = {
      uuid: pageData.uuid,
      internalName: pageData.internalName,
      shortDescription: pageData.shortDescription,
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
    if (type === 'presentation') {
      const presentationUuid: any = await this.presentationRepository.findUuidByShortId(shortId).toPromise();
      const presentation: any = await this.presentationRepository.getPresentation(presentationUuid.data.uuid).toPromise();

      return {
        uuid: presentation.data.uuid,
        name: presentation.data.name,
        shortId: presentation.data.shortId,
        type: type,
      };
    }
  }
}
