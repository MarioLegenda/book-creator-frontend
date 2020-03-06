import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MiscRouteResolver {
  private cndUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    getHashtags: `${this.cndUri}/api/v1/misc/get-hashtags`,
  };

  getHashtags(): string {
    return `${this.routes.getHashtags}`;
  }
}
