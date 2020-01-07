import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../page/httpActions";
import {PageContextInitializer} from "../../../logic/PageComponent/context/PageContextInitializer";
import {PageRepository} from "../../../repository/PageRepository";
import {viewAddTextBlock, viewCreateCodeBlock, viewTextBlockRemoved} from "../../page/viewActions";
import {HttpModel} from "../../../model/http/HttpModel";

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
          this.addTextBlock(action);

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
          this.addCodeBlock(action);

          break;
        }
      }
    });
  }

  private addCodeBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;

    const model = HttpModel.addCodeBlock(pageUuid, position);

    this.pageRepository.addCodeBlock(model).subscribe((data) => {
      this.store.dispatch(viewCreateCodeBlock(data));
    });
  }

  private addTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;

    const model = HttpModel.addTextBlock(pageUuid, position);

    this.pageRepository.addTextBlock(model).subscribe((model) => {
      this.store.dispatch(httpCreateTextBlockFinished());
      this.store.dispatch(viewAddTextBlock(model));
    });
  }

  private removeTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;

    const model = HttpModel.removeBlock(pageUuid, blockUuid);

    this.pageRepository.removeBlock(model).subscribe(() => {
      this.store.dispatch(viewTextBlockRemoved(action));
    })
  }

  private updateTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
    const position: number = action.position;
    const text: string = action.text;

    const model = HttpModel.updateTextBlock(
      pageUuid,
      blockUuid,
      text,
      position,
    );

    this.pageRepository.updateTextBlock(model).subscribe(() => {});
  }
}
