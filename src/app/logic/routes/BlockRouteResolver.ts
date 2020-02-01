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
    addNewCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/add-new-block`,
    addNewMultimediaBlock: `${this.bookApiUri}/api/v1/pages/multimedia-block/add-new-block`,
    removeBlock: `${this.bookApiUri}/api/v1/pages/block/remove`,
    updateTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/update-block`,
    updateCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/update-block`,
    updateMultimediaBlock: `${this.bookApiUri}/api/v1/pages/multimedia-block/update-block`,
    removeMultimediaBlock: `${this.bookApiUri}/api/v1/pages/block/remove-multimedia-block`,
    updatePosition: `${this.bookApiUri}/api/v1/pages/block/update-position`,
  };

  addNewTextBlock(): string {
    return this.routes.addNewTextBlock;
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
}
