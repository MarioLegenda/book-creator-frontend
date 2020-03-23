import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "./routeResolvers/CodeEditorRouteResolver";
import {Injectable} from "@angular/core";
import {EnvEmulatorRouteResolver} from "./routeResolvers/EnvEmulatorRouteResolver";
import {reduce} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class EnvironmentEmulatorRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver,
    private envRouteResolver: EnvEmulatorRouteResolver,
  ) {}

  public BuildAndRunProject(codeProjectUuid: string, model) {
    return this.httpClient.post(this.routeResolver.runProject(codeProjectUuid), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }

  public buildAndRunSingleFile(model) {
    return this.httpClient.post(this.envRouteResolver.singleFileBuildAndRun(), model)
      .pipe(
      reduce((acc, res: any) => {
        return res.data;
      }, {})
    );
  }

  public buildState(model) {
    return this.httpClient.post(this.envRouteResolver.buildState(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }

  public getEnvironments() {
    return this.httpClient.get(this.envRouteResolver.getEnvironment())
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }
}
