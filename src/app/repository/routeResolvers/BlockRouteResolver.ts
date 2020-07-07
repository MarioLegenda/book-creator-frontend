import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BlockRouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    addNewTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/add-new-block`,
    addMainHeader: `${this.bookApiUri}/api/v1/pages/header/add-main-header-block`,
    addSubheader: `${this.bookApiUri}/api/v1/pages/header/add-subheader-block`,
    addNewCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/add-new-block`,
    addNewMultimediaBlock: `${this.bookApiUri}/api/v1/pages/multimedia-block/add-new-block`,
    removeBlock: `${this.bookApiUri}/api/v1/pages/block/remove`,
    updateTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/update-block`,
    updateCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/update-block`,
    updateMultimediaBlock: `${this.bookApiUri}/api/v1/pages/multimedia-block/update-block`,
    removeMultimediaBlock: `${this.bookApiUri}/api/v1/pages/block/remove-multimedia-block`,
    updatePosition: `${this.bookApiUri}/api/v1/pages/block/update-position`,
    updateMainHeader: `${this.bookApiUri}/api/v1/pages/header/update-main-header-block`,
    updateSubheader: `${this.bookApiUri}/api/v1/pages/header/update-subheader-block`,
    addQuoteBlock: `${this.bookApiUri}/api/v1/pages/quote/add-new-block`,
    updateQuoteBlock: `${this.bookApiUri}/api/v1/pages/quote/update-block`,
    updateCodeResult: `${this.bookApiUri}/api/v1/pages/code-block/update-code-result`,
  };

  addNewTextBlock(): string {
    return this.routes.addNewTextBlock;
  }

  addQuoteBlock(): string {
    return this.routes.addQuoteBlock;
  }

  addNewCodeBlock(): string {
    return this.routes.addNewCodeBlock;
  }

  removeBlock(): string {
    return this.routes.removeBlock;
  }

  updateTextBlock(): string {
    return this.routes.updateTextBlock;
  }

  updateCodeBlock(): string {
    return this.routes.updateCodeBlock;
  }

  addNewMultimediaBlock(): string {
    return this.routes.addNewMultimediaBlock;
  }

  updateMultimediaBlock(): string {
    return this.routes.updateMultimediaBlock;
  }

  removeMultimediaBlock(): string {
    return this.routes.removeMultimediaBlock;
  }

  updatePosition(): string {
    return this.routes.updatePosition;
  }

  addMainHeader(): string {
    return this.routes.addMainHeader;
  }

  updateMainHeader(): string {
    return this.routes.updateMainHeader;
  }

  addSubheader(): string {
    return this.routes.addSubheader;
  }

  updateSubheader(): string {
    return this.routes.updateSubheader;
  }

  updateQuoteBlock(): string {
    return this.routes.updateQuoteBlock;
  }

  updateCodeResult(): string {
    return this.routes.updateCodeResult;
  }
}
