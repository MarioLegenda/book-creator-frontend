import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {concatMap, map} from "rxjs/operators";
import {ProjectRouteResolver} from "./routeResolvers/ProjectRouteResolver";
import {IResponse} from "../model/http/response/IResponse";

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository {
  constructor(
    private httpClient: HttpClient,
    private projectRouteResolver: ProjectRouteResolver,
  ) {}

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

  getProjects(size: number = 10, page: number = 1) {
    return this.httpClient.get(this.projectRouteResolver.getProjects(size, page));
  }
}
