import {Component, OnInit} from '@angular/core';
import {BlogRepository} from "../../../repository/BlogRepository";
import {MiscRepository} from "../../../repository/MiscRepository";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'cms-publish-blog',
  styleUrls: [
    '../../shared/styles/generic.component.scss',
    './publish.component.scss',
  ],
  templateUrl: './publish.component.html',
})
/**
 * This component must have:
 * 1. Title of the blog
 * 2. url of the future published blog
 * 3. The info for linked code projects and links to the editors of them
 * 4. A list of hashtags for the user to choose from (required)
 */
export class PublishComponent implements OnInit {
  blog: any = null;
  hashtags: any = null;

  publishedUrl: string = null;
  codeProjects: any[] = [];

  constructor(
    private blogRepository: BlogRepository,
    private miscRepository: MiscRepository,
    private codeProjectsRepository: CodeProjectsRepository,
  ) {}

  ngOnInit() {
    const split = location.pathname.split('/');
    const shortId = split[split.length - 1];

    if (!shortId) this.redirectTo404();

    this.getInitialData(shortId).then(({type, data}) => {
      if (type === 'ok') {
        this.blog = data.blog;
        this.hashtags = data.hashtags;
        this.codeProjects = data.codeProjects;

        this.publishedUrl = `/blog/${this.blog.slug}/${this.blog.shortId}`;

        return;
      }

      if (type === 'fail') {
        if (data.status === 404) return this.redirectTo404();

        return this.redirectTo500();
      }
    });
  }

  onPreview($event) {
    $event.stopPropagation();

    window.location.href = `${environment.protocol}://${environment.bookApiUri}/cms/blog/preview/${this.blog.slug}/${this.blog.shortId}`;
  }

  private async getInitialData(shortId: string) {
    try {
      const uuid: any = await this.blogRepository.getUuid(shortId).toPromise();

      const blog: any = await this.blogRepository.getBlog(uuid.data.uuid).toPromise();
      const hashtags: any = await this.miscRepository.getHashtagsAsArray().toPromise();
      const codeProjects = [];
      if (blog.data.codeProjects.length !== 0) {
        for (const cpUuid of blog.data.codeProjects) {
          const cp: any = await this.codeProjectsRepository.getSingleProject(cpUuid).toPromise();

          codeProjects.push(cp);
        }
      }

      return {
        type: 'ok',
        data: {blog: blog.data, hashtags: hashtags.data, codeProjects: codeProjects},
      }
    } catch (e) {
      return {
        type: 'fail',
        data: {
          status: e.status,
        }
      }
    }
  }

  private redirectTo404(): void {
    window.location.href = '/cms/management/404';
  }

  private redirectTo500(): void {
    window.location.href = '/500';
  }
}
