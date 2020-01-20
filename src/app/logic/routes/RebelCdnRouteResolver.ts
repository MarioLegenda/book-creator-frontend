import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class RebelCdnRouteResolver {
  private cndUri = environment.composeRebelCdnUrl();

  private readonly routes = {
    uploadFile: `${this.cndUri}/api/cdn/v1/upload-file`,
  };

  uploadFile(): string {
    return `${this.routes.uploadFile}`;
  }
}
