import {HttpModel} from "../model/http/HttpModel";
import {Router} from "@angular/router";
import {PageRepository} from "../repository/PageRepository";
import {BlogRepository} from "../repository/BlogRepository";

export function createBlog(
  router: Router,
  dialogRef,
  pageRepository: PageRepository,
  blogRepository: BlogRepository,
) {
  const createBlogData = async () => {
    const emptyPage: any = await pageRepository.createEmptyPage().toPromise();
    const blankBlog: any = await blogRepository.createBlankBlog().toPromise();

    await blogRepository.linkPageToBlog(HttpModel.createLinkPageToBlog(
      emptyPage.data.uuid,
      blankBlog.data.uuid,
    )).toPromise();

    const emptyPageShortId = emptyPage.data.shortId;
    const blankBlogShortId = blankBlog.data.shortId;

    return {emptyPageShortId, blankBlogShortId};
  };

  createBlogData().then(({emptyPageShortId, blankBlogShortId}) => {
    router.navigate(['/page', 'blog', blankBlogShortId, emptyPageShortId]);
  });
}
