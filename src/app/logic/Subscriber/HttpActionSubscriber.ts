import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../store/httpActions";
import {CreateTextBlockModel} from "../../model/http/CreateTextBlockModel";
import {PageContextInitializer} from "../PageComponent/context/PageContextInitializer";
import {IRequestModel} from "../../model/http/IRequestModel";
import {PageRepository} from "../../repository/PageRepository";
import {viewAddTextBlock, viewTextBlockRemoved} from "../../store/viewActions";
import {TextBlockModel} from "../../model/http/TextBlockModel";
import {RemoveBlockModel} from "../../model/http/RemoveBlockModel";
import {UpdateTextBlock} from "../../model/http/UpdateTextBlock";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private pageContextInitializer: PageContextInitializer,
    private pageRepository: PageRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('httpActions')));
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
        }
      }
    });
  }

  private addTextBlock() {
    const pageUuid: string = this.pageContextInitializer.getContext().uuid;

    const model: IRequestModel = CreateTextBlockModel.create(pageUuid);

    this.pageRepository.addTextBlock(model).subscribe((model: TextBlockModel) => {
      this.store.dispatch(httpCreateTextBlockFinished());
      this.store.dispatch(viewAddTextBlock(model.convertToViewModel()));
    });
  }

  private removeTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().uuid;
    const blockUuid: string = action.value.blockUuid;

    const model: IRequestModel = new RemoveBlockModel(
      pageUuid,
      blockUuid
    );

    this.pageRepository.removeBlock(model).subscribe(() => {
      this.store.dispatch(viewTextBlockRemoved(action));
    })
  }

  private updateTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().uuid;
    const blockUuid = action.blockUuid;

    const model: IRequestModel = UpdateTextBlock.create(
      pageUuid,
      blockUuid,
      (action.internalName) ? action.internalName : '',
      (action.shortDescription) ? action.shortDescription : '',
      (action.text) ? action.text : '',
    );

    console.log(model);

    this.pageRepository.updateTextBlock(model).subscribe(() => {

    });
  }
}