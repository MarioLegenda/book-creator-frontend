import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BlockRouteResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    addNewTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/add-new-block`,
    addNewCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/add-new-block`,
    removeBlock: `${this.bookApiUri}/api/v1/pages/block/remove`,
    updateTextBlock: `${this.bookApiUri}/api/v1/pages/text-block/update-block`,
    updateCodeBlock: `${this.bookApiUri}/api/v1/pages/code-block/update-block`,
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
}