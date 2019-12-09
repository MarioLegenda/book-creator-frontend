import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {reduce} from "rxjs/operators";
import {RouteResolver} from "../logic/RouteResolver";
import {CreateTextBlockModel} from "../model/http/CreateTextBlockModel";
import {TextBlockModel} from "../model/http/TextBlockModel";
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

  addTextBlock(model: IRequestModel) {
    return this.httpClient.put(this.routeResolver.addNewTextBlock(), model, {observe: 'response'})
      .pipe(
        reduce((acc, res: any) => {
          const body: any = res.body;
          const data = (body as any).data;

          return TextBlockModel.create(
            (model as any).data.pageUuid,
            data.uuid,
            data.internalName,
            data.shortDescription,
            data.text,
          );
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

          const models: CreateTextBlockModel[] = [];

          for (let [_, block] of Object.entries(blocks)) {
            models.push(TextBlockModel.create(
              pageUuid,
              (block as any).uuid,
              (block as any).internalName,
              (block as any).shortDescription,
              (block as any).text
            ));
          }

          return {
            uuid: page.uuid,
            internalName: page.internalName,
            shortId: page.shortId,
            shortDescription: page.shortDescription,
            blocks: models,
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
