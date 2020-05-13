import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RouteResolver} from "./routeResolvers/RouteResolver";
import {concatMap, map} from "rxjs/operators";
import {ProjectRouteResolver} from "./routeResolvers/ProjectRouteResolver";
import {IResponse} from "../model/http/response/IResponse";
import {Pagination} from "../views/manager/shared/Pagination";

@Injectable({
  providedIn: 'root',
})
export class CodeProjectsRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: RouteResolver,
    private projectRouteResolver: ProjectRouteResolver,
  ) {}

  createCodeProject(model) {
    return this.httpClient.put<IResponse>(this.routeResolver.createCodeProject(), model)
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  getProjects(pagination: Pagination, filters: string[]) {
    return this.httpClient.get<IResponse>(this.routeResolver.getProjects(pagination, filters))
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  getSingleProject(uuid: string) {
    return this.httpClient.get<IResponse>(this.projectRouteResolver.getSingleProject(uuid))
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  removeCodeProject(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.removeCodeProject(), model)
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  searchCodeProjects(model, filters: string[]) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.searchCodeProjects(filters), model)
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  updateCodeProject(model) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.updateCodeProject(), model)
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  getNext(model, filters: string[]) {
    return this.httpClient.post<IResponse>(this.projectRouteResolver.getNext(filters), model)
      .pipe(
        map((res: IResponse) => res.data)
      );
  }

  getProjectByShortId(shortId: string) {
    return this.httpClient.get(this.projectRouteResolver.getProjectUuidByShortId(shortId))
      .pipe(
        concatMap((response: IResponse) => {
          return this.httpClient.get(this.projectRouteResolver.getSingleProject(response.data));
        })
      ).pipe(
        map((res: IResponse) => res.data)
      );
  }

  sortByEnvironment(model) {
    return this.httpClient.get(this.projectRouteResolver.sortByEnvironment(model))
      .pipe(
        map((response: IResponse) => response.data)
      );
  }
}
