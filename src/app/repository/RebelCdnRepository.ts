import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RebelCdnRouteResolver} from "../logic/routes/RebelCdnRouteResolver";

@Injectable({
  providedIn: 'root',
})
export class RebelCdnRepository {
  constructor(
    private httpClient: HttpClient,
    private rebelCdnRouteResolver: RebelCdnRouteResolver
  ) {}

  uploadFile(model) {
    return this.httpClient.put(this.rebelCdnRouteResolver.uploadFile(), model);
  }
}
