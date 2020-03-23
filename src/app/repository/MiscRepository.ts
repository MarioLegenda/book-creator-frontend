import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MiscRouteResolver} from "./routeResolvers/MiscRouteResolver";

@Injectable({
  providedIn: 'root',
})
export class MiscRepository {
  constructor(
    private routeResolver: MiscRouteResolver,
    private httpClient: HttpClient,
  ) {}

  getHashtagsAsArray() {
    return this.httpClient.get(this.routeResolver.getHashtagsAsArray());
  }
}
