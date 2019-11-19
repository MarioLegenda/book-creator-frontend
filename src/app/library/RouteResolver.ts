import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RouteResolver {
  private readonly routes = {
    addNewTextBlock: `${environment.composeBaseUrl()}/api/v1/pages/text-block/add-new-block`,
    getPageByUuid: `${environment.composeBaseUrl()}/api/v1/pages/get-by-uuid/:pageUuid`,
  };

  addNewTextBlock() {
    return this.routes.addNewTextBlock;
  }

  getPageByUuid(pageUuid: string) {
    return this.routes.getPageByUuid.replace(/:pageUuid/, pageUuid);
  }
}
