import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpCreateTextBlockFinished} from "../../page/httpActions";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {PageRepository} from "../../../repository/PageRepository";
import {
  viewAddMainHeaderBlock,
  viewAddMultimediaBlock, viewAddQuoteBlock, viewAddSubheader,
  viewAddTextBlock,
  viewCreateCodeBlock,
  viewTextBlockRemoved, viewUpdateSubheaderBlock
} from "../../page/viewActions";
import {HttpModel} from "../../../model/http/HttpModel";
import deepcopy from 'deepcopy';
import {ComponentType} from "../../../logic/PageComponent/ComponentType";
import {BlogRepository} from "../../../repository/BlogRepository";
import {BlogState} from "../../../logic/BlogState";
import {changeState} from "../../../logic/utilFns";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private pageContextInitializer: AppContextInitializer,
    private pageRepository: PageRepository,
    private blogRepository: BlogRepository,
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

        case actionTypes.HTTP_CHANGE_BLOG_STATE: {
          const uuid = action.uuid;
          const state = action.state;
          const hashtags = action.hashtags;

          if (state === BlogState.DRAFT) return;

          let model = null;
          if (state === BlogState.PUBLISHED) {
            model = HttpModel.publish(uuid, hashtags);
          } else if (state === BlogState.CHANGED) {
            model = HttpModel.change(uuid, null);
          }

          this.blogRepository.changeState(model).subscribe(() => {});

          break;
        }

        case actionTypes.HTTP_CREATE_MAIN_HEADER: {
          if (this.pageContextInitializer.isInitialized()) {
            this.addMainHeader(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.addMainHeader(data);
            })(deepcopy(action)));
          }

          break;
        }

        case actionTypes.HTTP_CREATE_SUBHEADER: {
          if (this.pageContextInitializer.isInitialized()) {
            this.createSubheader(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.createSubheader(data);
            })(deepcopy(action)));
          }

          break;
        }

        case actionTypes.HTTP_CREATE_QUOTE_BLOCK: {
          if (this.pageContextInitializer.isInitialized()) {
            this.createQuoteBlock(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.createQuoteBlock(data);
            })(deepcopy(action)));
          }

          break;
        }

        case actionTypes.HTTP_CREATE_MULTIMEDIA_BLOCK: {
          if (this.pageContextInitializer.isInitialized()) {
            this.addMultimediaBlock(action);
          } else {
            this.pageContextInitializer.whenInit(((data) => {
              return () => this.addMultimediaBlock(data);
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

        case actionTypes.HTTP_UPDATE_QUOTE_BLOCK: {
          this.updateQuoteBlock(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_SUBHEADER: {
          this.updateSubheader(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_MAIN_HEADER: {
          this.updateMainHeader(action);

          break;
        }

        case actionTypes.HTTP_UPDATE_BLOCK_POSITION: {
          this.updateBlockPosition(action);

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

  private updateSubheader(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const text: string = action.text;
    const blockUuid: string = action.blockUuid;

    const model = HttpModel.updateSubheader(pageUuid, blockUuid, text);

    this.pageRepository.updateSubheader(model).subscribe((data) => {
      changeState(this.pageContextInitializer.getContext(), this.store);
      this.store.dispatch(viewUpdateSubheaderBlock(data));
    });
  }

  private createSubheader(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;
    const text: string = '';

    const model = HttpModel.createSubheader(pageUuid, position, text);

    this.pageRepository.addSubheader(model).subscribe((data) => {
      changeState(this.pageContextInitializer.getContext(), this.store);

      this.store.dispatch(viewAddSubheader(data));
    });
  }

  private createQuoteBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;
    const text: string = '';

    const model = HttpModel.createQuoteBlock(pageUuid, position, text);

    this.pageRepository.addQuoteBlock(model).subscribe((data) => {
      changeState(this.pageContextInitializer.getContext(), this.store);

      this.store.dispatch(viewAddQuoteBlock(data));
    });
  }

  private updateMainHeader(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
    const text: string = action.text;

    const model = HttpModel.updateMainHeader(
      pageUuid,
      blockUuid,
      text,
    );

    this.pageRepository.updateMainHeader(model).subscribe(() => {
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private addMainHeader(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;
    const text: string = '';

    const model = HttpModel.createMainHeader(pageUuid, position, text);

    this.pageRepository.addMainHeader(model).subscribe((data) => {
      this.store.dispatch(viewAddMainHeaderBlock(data));
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private updateBlockPosition(action) {
    const pageUuid: string = action.pageUuid;
    const blockUuid: string = action.blockUuid;
    const position: number = action.position;

    const model = HttpModel.updatePosition(pageUuid, blockUuid, position);

    this.pageRepository.updatePosition(model).subscribe(() => {
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private addCodeBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;

    const model = HttpModel.addCodeBlock(pageUuid, position);

    this.pageRepository.addCodeBlock(model).subscribe((data) => {
      changeState(this.pageContextInitializer.getContext(), this.store);
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
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private addMultimediaBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const position: number = action.position;

    const model = HttpModel.addMultimediaBlock(pageUuid, position, null, null, null);

    this.pageRepository.addMultimediaBlock(model).subscribe((data) => {
      this.store.dispatch(viewAddMultimediaBlock(data));
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private removeBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;

    const model = HttpModel.removeBlock(pageUuid, blockUuid);

    if (action.blockType === ComponentType.MULTIMEDIA_BLOCK_TYPE) {
      this.pageRepository.removeMultimediaBlock(model).subscribe(() => {
        this.store.dispatch(viewTextBlockRemoved(action));
        changeState(this.pageContextInitializer.getContext(), this.store);
      });
    } else {
      this.pageRepository.removeBlock(model).subscribe(() => {
        this.store.dispatch(viewTextBlockRemoved(action));
        changeState(this.pageContextInitializer.getContext(), this.store);
      });
    }
  }

  private updateTextBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
    const text: string = action.text;
    const internalName: string = action.internalName;
    const comment: string = action.comment;

    const model = HttpModel.updateTextBlock(
      pageUuid,
      blockUuid,
      text,
      internalName,
      comment,
    );

    this.pageRepository.updateTextBlock(model).subscribe(() => {
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private updateCodeBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
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
      isGist,
      isCode,
      gistData,
      emulator,
      readonly,
    );

    this.pageRepository.updateCodeBlock(model).subscribe(() => {
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }

  private updateQuoteBlock(action) {
    const pageUuid: string = this.pageContextInitializer.getContext().page.uuid;
    const blockUuid: string = action.blockUuid;
    const text: string = action.text;

    const model = HttpModel.updateQuoteBlock(
      pageUuid,
      blockUuid,
      text,
    );

    this.pageRepository.updateQuoteBlock(model).subscribe(() => {
      changeState(this.pageContextInitializer.getContext(), this.store);
    });
  }
}
