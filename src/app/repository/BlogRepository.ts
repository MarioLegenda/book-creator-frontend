import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BlogRoutesResolver} from './routeResolvers/BlogRoutesResolver';
import {map, reduce} from "rxjs/operators";
import {IResponse} from "../model/http/response/IResponse";
import {Pagination} from "../views/manager/shared/Pagination";

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
    return this.httpClient.post<IResponse>(this.routeResolver.unLinkCodeProject(), model)
      .pipe(
        map((res: any) => res.data)
      );
  }

  getBlogs(pagination: Pagination, filters: string[]) {
    return this.httpClient.get<IResponse>(this.routeResolver.getBlogs(pagination.size, pagination.page, filters))
      .pipe(
        map((res: any) => res.data)
      );
  }

  removeBlog(model) {
    return this.httpClient.post<IResponse>(this.routeResolver.removeBlog(), model)
      .pipe(
        map((res: any) => res.data)
      );
  }

  search(model) {
    return this.httpClient.post<IResponse>(this.routeResolver.searchBlog(), model)
      .pipe(
        map((res: any) => res.data)
      );
  }

  getNext(model, filters: string[]) {
    return this.httpClient.post<IResponse>(this.routeResolver.getNextBlog(filters), model)
      .pipe(
        map((res: any) => res.data)
      );
  }

  changeState(model) {
    return this.httpClient.post<IResponse>(this.routeResolver.changeState(), model)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
