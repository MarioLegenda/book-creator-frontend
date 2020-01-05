import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BlogRoutesResolver {
  private bookApiUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    createBlankBlog: `${this.bookApiUri}/api/v1/knowledge-source/create/blank-blog`,
    getUuid: `${this.bookApiUri}/api/v1/knowledge-source/get/blog/uuid`,
    getBlog: `${this.bookApiUri}/api/v1/knowledge-source/get/blog/by-uuid`,
  };

  createBlankBlog(): string {
      return this.routes.createBlankBlog;
  }

  getUuid(shortId: string): string {
    return `${this.routes.getUuid}/${shortId}`;
  }

  getBlog(uuid: string): string {
    return `${this.routes.getBlog}/${uuid}`;
  }
}
