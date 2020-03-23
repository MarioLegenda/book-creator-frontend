import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MiscRouteResolver {
  private cndUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    getHashtagsAsArray: `${this.cndUri}/api/v1/misc/get-hashtags-as-array`,
  };

  getHashtagsAsArray(): string {
    return `${this.routes.getHashtagsAsArray}`;
  }
}
