import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {reduce} from "rxjs/operators";
import {RouteResolver} from "./routeResolvers/RouteResolver";
import {BlockRouteResolver} from "./routeResolvers/BlockRouteResolver";
import {IPageData} from "../logic/PageComponent/context/IPageData";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PageRepository {
  constructor(
    private routeResolver: RouteResolver,
    private blockRouteResolver: BlockRouteResolver,
    private httpClient: HttpClient,
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

  getPageByUuid(pageUuid: string): Observable<IPageData> {
    const seed: IPageData = {
      uuid: null,
      shortId: null,
      blocks: []
    };

    return this.httpClient.get<Observable<IPageData>>(this.routeResolver.getPageByUuid(pageUuid), {observe: 'response'})
      .pipe(
        reduce((acc, res: any) => {
          const body: any = res.body;
          const page = body.data;

          const blocks = (body as any).data.blocks;

          const pageData: IPageData = {
            uuid: page.uuid,
            shortId: page.shortId,
            blocks: Object.values(blocks),
          };

          return pageData;
        }, seed),
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

  updateMultimediaBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.updateMultimediaBlock(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  removeMultimediaBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.removeMultimediaBlock(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  updatePosition(model) {
    return this.httpClient.post(this.blockRouteResolver.updatePosition(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  addMainHeader(model) {
    return this.httpClient.put(this.blockRouteResolver.addMainHeader(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  updateMainHeader(model) {
    return this.httpClient.post(this.blockRouteResolver.updateMainHeader(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  addSubheader(model) {
    return this.httpClient.put(this.blockRouteResolver.addSubheader(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  updateSubheader(model) {
    return this.httpClient.post(this.blockRouteResolver.updateSubheader(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  addQuoteBlock(model) {
    return this.httpClient.put(this.blockRouteResolver.addQuoteBlock(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  updateQuoteBlock(model) {
    return this.httpClient.post(this.blockRouteResolver.updateQuoteBlock(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }
}
