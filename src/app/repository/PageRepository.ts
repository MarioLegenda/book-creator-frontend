import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {reduce} from "rxjs/operators";
import {RouteResolver} from "../logic/routes/RouteResolver";
import {BlockRouteResolver} from "../logic/routes/BlockRouteResolver";
import {RebelCdnRepository} from "./RebelCdnRepository";

@Injectable({
  providedIn: 'root',
})
export class PageRepository {
  constructor(
    private routeResolver: RouteResolver,
    private blockRouteResolver: BlockRouteResolver,
    private httpClient: HttpClient,
    private rebelCdnRepository: RebelCdnRepository,
  ) {}

  createEmptyPage() {
    return this.httpClient.put(this.routeResolver.createEmptyPage(), {});
  }

  findUuidByShortId(shortId: string) {
    return this.httpClient.get(this.routeResolver.findUuidByShortId(shortId));
  }

  addTextBlock(model: any) {
    return this.httpClient.put(this.blockRouteResolver.addNewTextBlock(), model, {observe: 'response'})
      .pipe(
        reduce((acc, res: any) => {
          const body: any = res.body;
          return (body as any).data;
        }, {})
      );
  }

  addCodeBlock(model: any) {
    return this.httpClient.put(this.blockRouteResolver.addNewCodeBlock(), model, {observe: 'response'})
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

  removeBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.removeBlock(), model);
  }

  updateTextBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.updateTextBlock(), model);
  }

  updateCodeBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.updateCodeBlock(), model);
  }

  addMultimediaBlock(model) {
    return this.httpClient.put(this.blockRouteResolver.addNewMultimediaBlock(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }
}
