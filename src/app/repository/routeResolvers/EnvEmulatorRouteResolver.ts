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
    buildState: `${this.envEmulatorUri}/api/environment-emulator/build-state`,
    installPackage: `${this.envEmulatorUri}/api/environment-emulator/install-package`,
  };

  getEnvironment(): string {
    return this.routes.getEnvironment;
  }

  singleFileBuildAndRun(): string {
    return this.routes.singleFileBuildAndRun;
  }

  buildState(): string {
    return this.routes.buildState;
  }

  installPackage(): string {
    return this.routes.installPackage;
  }
}
