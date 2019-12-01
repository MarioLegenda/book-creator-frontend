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

  findByShortId(shortId: string) {

  }

  private getPresentationByShortId(shortId: string) {

  }
}
