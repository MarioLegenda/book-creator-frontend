import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "./routeResolvers/CodeEditorRouteResolver";
import {Injectable} from "@angular/core";
import {EnvEmulatorRouteResolver} from "./routeResolvers/EnvEmulatorRouteResolver";
import {map, timeout} from "rxjs/operators";
import {IResponse} from "../model/http/response/IResponse";

@Injectable({
  providedIn: 'root',
})
export class EnvironmentEmulatorRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver,
    private envRouteResolver: EnvEmulatorRouteResolver,
  ) {}

  public BuildAndRunProject(codeProjectUuid: string, model, defaultTimeout: number = 16000) {
    return this.httpClient.post(this.routeResolver.runProject(codeProjectUuid), model)
      .pipe(
        timeout(60000),
        map((response: IResponse) => response.data)
      );
  }

  public buildAndRunSingleFile(model, defaultTimeout: number = 16000) {
    return this.httpClient.post(this.envRouteResolver.singleFileBuildAndRun(), model)
      .pipe(
        timeout(60000),
        map((response: IResponse) => response.data)
    );
  }

  public buildState(model) {
    return this.httpClient.post(this.envRouteResolver.buildState(), model)
      .pipe(
        timeout(5000),
        map((response: IResponse) => response.data)
      );
  }

  public getEnvironments() {
    return this.httpClient.get(this.envRouteResolver.getEnvironment())
      .pipe(
        timeout(5000),
        map((response: IResponse) => response.data)
      );
  }
}
