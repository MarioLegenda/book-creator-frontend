import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {concatMap, reduce} from "rxjs/operators";
import {ProjectRouteResolver} from "../logic/routes/ProjectRouteResolver";

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
        concatMap((val: any) => {
          return this.httpClient.get(this.projectRouteResolver.getSingleProject(val.data));
        })
      ).pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  getProjectByUuid(uuid: string) {
    return this.httpClient.get(this.projectRouteResolver.getSingleProject(uuid));
  }

  getProjects(size: number = 10, page: number = 1) {
    return this.httpClient.get(this.projectRouteResolver.getProjects(size, page));
  }
}
