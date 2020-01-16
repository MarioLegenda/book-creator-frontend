import {HttpClient} from "@angular/common/http";
import {CodeEditorRouteResolver} from "../logic/routes/CodeEditorRouteResolver";
import {Injectable} from "@angular/core";
import {EnvEmulatorRouteResolver} from "../logic/routes/EnvEmulatorRouteResolver";
import {reduce} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class EnvironmentEmulatorRepository {
  private cacheObservable: Observable<object>;

  private cache = {};

  constructor(
    private httpClient: HttpClient,
    private routeResolver: CodeEditorRouteResolver,
    private envRouteResolver: EnvEmulatorRouteResolver,
  ) {}

  public BuildAndRunProject(codeProjectUuid: string, content: string) {
    return this.httpClient.post(this.routeResolver.runProject(codeProjectUuid), {
      data: content,
    })
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {})
      );
  }

  public buildAndRunSingleFile(
    pageShortId: string,
    blockShortId: string,
    code: string,
    environment: string
  ) {
    return this.httpClient.post(this.envRouteResolver.singleFileBuildAndRun(), {
      data: {
        pageShortId,
        blockShortId,
        code,
        environment
      },
    })
      .pipe(
      reduce((acc, res: any) => {
        return res.data;
      }, {})
    );
  }

  public getEnvironments() {
    if (!this.cacheObservable) {
      this.cacheObservable = new Observable<object>(subscriber => {
        if (this.cache['getEnvironments']) {
          subscriber.next(this.cache['getEnvironments']);

          return;
        }

        this.httpClient.get(this.envRouteResolver.getEnvironment())
          .pipe(
            reduce((acc, res: any) => {
              return res.data;
            }, {})
          ).subscribe((data) => {
            this.cache['getEnvironments'] = data;

            subscriber.next(this.cache['getEnvironments']);
        });
      });

      return this.cacheObservable;
    }

    return this.cacheObservable;
  }
}
