import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BlogRoutesResolver} from '../logic/routes/BlogRoutesResolver';
import {reduce} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class BlogRepository {
  constructor(
    private httpClient: HttpClient,
    private routeResolver: BlogRoutesResolver,
  ) {}

  createBlankBlog() {
    return this.httpClient.put(this.routeResolver.createBlankBlog(), {});
  }

  getUuid(shortId: string) {
    return this.httpClient.get(this.routeResolver.getUuid(shortId));
  }

  getBlog(uuid: string) {
    return this.httpClient.get(this.routeResolver.getBlog(uuid));
  }

  updateBlog(model: any) {
    return this.httpClient.post(this.routeResolver.updateBlog(), model);
  }

  linkPageToBlog(model: any) {
    return this.httpClient.post(this.routeResolver.linkPageToBlog(), model);
  }

  linkCodeProject(model: any) {
    return this.httpClient.post(this.routeResolver.linkCodeProject(), model);
  }

  unLinkCodeProject(model: any) {
    return this.httpClient.post(this.routeResolver.unLinkCodeProject(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }
}
