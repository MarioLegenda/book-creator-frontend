import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {reduce} from "rxjs/operators";
import {RouteResolver} from "../logic/routes/RouteResolver";
import {IRequestModel} from "../model/IRequestModel";

@Injectable({
  providedIn: 'root',
})
export class PageRepository {
  constructor(
    private routeResolver: RouteResolver,
    private httpClient: HttpClient
  ) {}

  createEmptyPage() {
    return this.httpClient.put(this.routeResolver.createEmptyPage(), {});
  }

  findUuidByShortId(shortId: string) {
    return this.httpClient.get(this.routeResolver.findUuidByShortId(shortId));
  }

  addTextBlock(model: any) {
    return this.httpClient.put(this.routeResolver.addNewTextBlock(), model, {observe: 'response'})
      .pipe(
        reduce((acc, res: any) => {
          const body: any = res.body;
          return (body as any).data;
        }, {})
      );
  }

  getPageByUuid(pageUuid: string) {
    return this.httpClient.get(this.routeResolver.getPageByUuid(pageUuid), {observe: 'response'})
      .pipe(
        reduce((acc, res: any) => {
          const body: any = res.body;
          const page = body.data;

          const blocks = (body as any).data.blocks;

          return {
            uuid: page.uuid,
            shortId: page.shortId,
            blocks: Object.values(blocks),
          };
        }, {}),
      );
  }

  removeBlock(model: IRequestModel) {
    return this.httpClient.post(this.routeResolver.removeBlock(), model);
  }

  updateTextBlock(model: IRequestModel) {
    return this.httpClient.post(this.routeResolver.updateBlock(), model);
  }
}
