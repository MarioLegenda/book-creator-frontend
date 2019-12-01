import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {PageContext} from "./PageContext";
import {PageRepository} from "../../../repository/PageRepository";
import {TextBlockModel} from "../../../model/http/TextBlockModel";
import {actionTypes, viewAddTextBlock} from "../../../store/viewActions";

@Injectable({
  providedIn: 'root',
})
export class PageContextInitializer {
  private context: PageContext;

  private contextInitiated = false;

  constructor(
    private pageRepository: PageRepository,
    private store: Store<any>
  ) {}

  initContext(activatedRoute: ActivatedRoute) {
    const pageShortId = activatedRoute.snapshot.paramMap.get('pageShortId');

    this.getPageByShortId(pageShortId).then((page) => {
      this.context = new PageContext(
        page.uuid,
        page.shortId,
        page.internalName,
        page.shortDescription,
      );

      const blocks: TextBlockModel[] = page.blocks;

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

  private async getPageByShortId(shortId: string) {
    const uuidModel: any = await this.pageRepository.findUuidByShortId(shortId).toPromise();

    return await this.pageRepository.getPageByUuid(uuidModel.data.uuid).toPromise();
  }
}
