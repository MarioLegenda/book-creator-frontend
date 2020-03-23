import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BlogRoutesResolver} from './routeResolvers/BlogRoutesResolver';
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

  getBlogs(size: number = 10, page: number = 1) {
    return this.httpClient.get(this.routeResolver.getBlogs(size, page))
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  removeBlog(model) {
    return this.httpClient.post(this.routeResolver.removeBlog(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  search(model) {
    return this.httpClient.post(this.routeResolver.searchBlog(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  getNext(model) {
    return this.httpClient.post(this.routeResolver.getNextBlog(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }

  changeState(model) {
    return this.httpClient.post(this.routeResolver.changeState(), model)
      .pipe(
        reduce((acc, res: any) => {
          return (res as any).data;
        }, {})
      );
  }
}
