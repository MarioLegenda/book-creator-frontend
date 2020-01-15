import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../page/httpActions";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {PageRepository} from "../../../repository/PageRepository";
import {viewAddTextBlock, viewCreateCodeBlock, viewTextBlockRemoved} from "../../page/viewActions";
import {HttpModel} from "../../../model/http/HttpModel";
import deepcopy from 'deepcopy';

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private pageContextInitializer: AppContextInitializer,
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
          if (this.pageContextInitializer.isInitialized()) {
            this.addTextBlock(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.addTextBlock(data);
            })(deepcopy(action)))
          }

          break;
        }

        case actionTypes.HTTP_REMOVE_BLOCK: {
          this.removeBlock(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_TEXT_BLOCK: {
          this.updateTextBlock(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_CODE_BLOCK: {
          this.updateCodeBlock(action);

          break;
        }

        case actionTypes.HTTP_CREATE_CODE_BLOCK: {
          if (this.pageContextInitializer.isInitialized()) {
            this.addCodeBlock(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.addCodeBlock(data);
            })(deepcopy(action)))
          }

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

  private removeBlock(action) {
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

  private updateCodeBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
    const position: number = action.position;
    const text: string = action.text;
    const readonly: boolean = action.readonly;
    const gistData = action.gistData;
    const isGist: boolean = action.isGist;
    const isCode: boolean = action.isCode;
    const emulator: boolean = action.emulator;

    const model = HttpModel.updateCodeBlock(
      pageUuid,
      blockUuid,
      text,
      position,
      isGist,
      isCode,
      gistData,
      emulator,
      readonly,
    );

    this.pageRepository.updateCodeBlock(model).subscribe(() => {});
  }
}
