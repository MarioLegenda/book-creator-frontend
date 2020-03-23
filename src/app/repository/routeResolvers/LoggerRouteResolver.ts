import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LoggerRouteResolver {
  private cndUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    remoteLog: `${this.cndUri}/api/v1/public/remote-log`,
  };

  remoteLog(): string {
    return `${this.routes.remoteLog}`;
  }
}
