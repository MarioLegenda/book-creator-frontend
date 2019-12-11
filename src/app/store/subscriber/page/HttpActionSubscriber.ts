import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../page/httpActions";
import {CreateTextBlockModel} from "../../../model/http/CreateTextBlockModel";
import {PageContextInitializer} from "../../../logic/PageComponent/context/PageContextInitializer";
import {PageRepository} from "../../../repository/PageRepository";
import {viewAddTextBlock, viewCreateCodeBlock, viewTextBlockRemoved} from "../../page/viewActions";
import {TextBlockModel} from "../../../model/http/TextBlockModel";
import {RemoveBlockModel} from "../../../model/http/RemoveBlockModel";
import {UpdateTextBlock} from "../../../model/http/UpdateTextBlock";
import {CreateCodeBlock} from "../../../model/http/CreateCodeBlock";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private pageContextInitializer: PageContextInitializer,
    private pageRepository: PageRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('pageHttpActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.HTTP_CREATE_TEXT_BLOCK: {
          this.addTextBlock();

          break;
        }

        case actionTypes.HTTP_REMOVE_TEXT_BLOCK: {
          this.removeTextBlock(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_TEXT_BLOCK: {
          this.updateTextBlock(action);

          break;
        }

        case actionTypes.HTTP_CREATE_CODE_BLOCK: {
          this.addCodeBlock();

          break;
        }
      }
    });
  }

  private addCodeBlock() {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;

    const model = CreateCodeBlock.create(pageUuid);

    this.store.dispatch(viewCreateCodeBlock(model.convertToViewModel()));
  }

  private addTextBlock() {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;

    const model = CreateTextBlockModel.create(pageUuid);

    this.pageRepository.addTextBlock(model).subscribe((model: TextBlockModel) => {
      this.store.dispatch(httpCreateTextBlockFinished());
      this.store.dispatch(viewAddTextBlock(model.convertToViewModel()));
    });
  }

  private removeTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.value.blockUuid;

    const model = new RemoveBlockModel(
      pageUuid,
      blockUuid
    );

    this.pageRepository.removeBlock(model).subscribe(() => {
      this.store.dispatch(viewTextBlockRemoved(action));
    })
  }

  private updateTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid = action.blockUuid;

    const model = UpdateTextBlock.create(
      pageUuid,
      blockUuid,
      (action.internalName) ? action.internalName : '',
      (action.shortDescription) ? action.shortDescription : '',
      (action.text) ? action.text : '',
    );

    this.pageRepository.updateTextBlock(model).subscribe(() => {

    });
  }
}
