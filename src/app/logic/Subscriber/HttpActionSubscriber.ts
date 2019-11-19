import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../store/httpActions";
import {CreateTextBlockModel} from "../../model/http/CreateTextBlockModel";
import {PageContextInitializer} from "../PageComponent/context/PageContextInitializer";
import {IRequestModel} from "../../model/http/IRequestModel";
import {PageRepository} from "../../repository/PageRepository";
import {viewAddTextBlock} from "../../store/viewActions";

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
      }
    });
  }

  private addTextBlock() {
    const pageUuid: string = this.pageContextInitializer.getContext().uuid;

    const model: IRequestModel = CreateTextBlockModel.create(pageUuid);

    this.pageRepository.addTextBlock(model).subscribe((model: CreateTextBlockModel) => {
      this.store.dispatch(httpCreateTextBlockFinished());
      this.store.dispatch(viewAddTextBlock(model.convertToViewModel()));
    });
  }

  private removeTextBlock(action) {
  }
}
