import {Injectable} from "@angular/core";
import {LoggerRouteResolver} from "../logic/routes/LoggerRouteResolver";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

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
