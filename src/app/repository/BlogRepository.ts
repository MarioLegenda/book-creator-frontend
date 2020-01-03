import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import RouteResolver from "../logic/routes/BlogRoutesResolver";

@Injectable({
  providedIn: 'root',
})
export default class CodeProjectsRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  createBlankBlog() {
    return this.httpClient.put(this.routeResolver.createBlankBlog(), {});
  }
}