import {Injectable} from "@angular/core";
import {IRequestModel} from "../model/http/IRequestModel";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "../logic/RouteResolver";

@Injectable({
  providedIn: 'root',
})
export class CodeProjectsRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver
  ) {}

  createCodeProject(model: IRequestModel) {
    return this.httpClient.put(this.routeResolver.createCodeProject(), model);
  }

  getProjects(sourceId: string, size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getProjects(sourceId, size, page));
  }
}
