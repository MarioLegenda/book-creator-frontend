import {Injectable} from "@angular/core";
import {IRequestModel} from "../model/http/IRequestModel";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/RouteResolver";

@Injectable({
  providedIn: 'root',
})
export class PresentationRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  createPresentation(model: IRequestModel) {
    return this.httpClient.put(this.routeResolver.createPresentation(), model);
  }

  findUuidByShortId(shortId: string) {
    return this.httpClient.get(this.routeResolver.getPresentationUuid(shortId));
  }

  getPresentation(uuid: string) {
    return this.httpClient.get(this.routeResolver.getPresentation(uuid));
  }
}
