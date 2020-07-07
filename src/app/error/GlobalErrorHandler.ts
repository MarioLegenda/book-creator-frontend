import {Injectable, ErrorHandler} from "@angular/core";
import {environment} from "../../environments/environment";
import {LoggerRepository} from "../repository/LoggerRepository";
import {HttpModel} from "../model/http/HttpModel";
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private loggerRepository: LoggerRepository,
    private deviceDetectorService: DeviceDetectorService,
  ) {}

  handleError(error) {
    if (error.toString() === 'unrecoverable') return;
    if (error.toString() === 'recoverable') return;

    const data = {
      message: 'Angular frontend error occurred',
      device: this.deviceDetectorService.getDeviceInfo(),
      errorMessage: JSON.stringify(error),
      stack: (error.stack) ? error.stack : null,
    };

    this.loggerRepository.remoteLog(HttpModel.remoteLog(data)).subscribe(() => {});

    if (!environment.production) {
      throw new Error(error);
    }
  }
}
