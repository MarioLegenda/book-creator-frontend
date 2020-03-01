import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class FileUploadRouteResolver {
  private cndUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    uploadFile: `${this.cndUri}/cms/upload-file`,
  };

  uploadFile(): string {
    return `${this.routes.uploadFile}`;
  }
}
