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
    const pageUuid = activatedRoute.snapshot.paramMap.get('pageUuid');

    this.pageRepository.getPageByUuid(pageUuid).subscribe((res) => {
      this.context = new PageContext(
        res.uuid,
        res.shortId,
        res.internalName,
        res.shortDescription,
      );

      const blocks: TextBlockModel[] = res.blocks;

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
}
