import {Injectable} from "@angular/core";
import {LoggerRouteResolver} from "./routeResolvers/LoggerRouteResolver";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LoggerRepository {
  constructor(
    private routeResolver: LoggerRouteResolver,
    private httpClient: HttpClient,
  ) {}

  remoteLog(model) {
    return this.httpClient.put(this.routeResolver.remoteLog(), model);
  }
}
