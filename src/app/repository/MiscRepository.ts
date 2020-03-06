import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MiscRouteResolver} from "../logic/routes/MiscRouteResolver";

@Injectable({
  providedIn: 'root',
})
export class MiscRepository {
  constructor(
    private routeResolver: MiscRouteResolver,
    private httpClient: HttpClient,
  ) {}

  getHashtags() {
    return this.httpClient.get(this.routeResolver.getHashtags());
  }
}
