import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class EnvEmulatorRouteResolver {
  private envEmulatorUri = environment.composeEnvEmulatorUrl();

  private readonly routes = {
    getEnvironment: `${this.envEmulatorUri}/api/environment-emulator/get-environments`,
    singleFileBuildAndRun: `${this.envEmulatorUri}/api/environment-emulator/build-and-run/single-file`,
  };

  getEnvironment(): string {
    return this.routes.getEnvironment;
  }

  singleFileBuildAndRun(): string {
    return this.routes.singleFileBuildAndRun;
  }
}
