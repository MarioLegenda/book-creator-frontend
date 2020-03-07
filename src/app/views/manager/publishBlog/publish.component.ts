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
export class PublishComponent implements OnInit {
  blog: any = null;
  hashtags: any = null;
  selectedTags = [];

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
        this.codeProjects = data.codeProjects;

        this.publishedUrl = `/blog/${this.blog.slug}/${this.blog.shortId}`;

        this.hashtags = this.loadHashtags(data.hashtags);

        return;
      }

      if (type === 'fail') {
        if (data.status === 404) return this.redirectTo404();

        return this.redirectTo500();
      }
    });
  }

  onHashtagSelect(hashtag) {
    if (this.isHashtagSelected(hashtag)) return;

    if (this.selectedTags.length < 5) {
      this.selectedTags.push(hashtag);
    }
  }

  onRemoveHashtag(idx: number) {
    this.selectedTags.splice(idx, 1);
  }

  onPreview($event) {
    $event.stopPropagation();

    window.location.href = `${environment.protocol}://${environment.bookApiUri}/cms/blog/preview/${this.blog.slug}/${this.blog.shortId}`;
  }

  isHashtagSelected(hashtag): boolean {
    const exists = this.selectedTags.filter(h => h.hashtag === hashtag.hashtag);

    return (exists.length > 0);
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

  private loadHashtags(hashtags: string[]) {
    const hs = [];
    for (const h of hashtags) {
      let w = `${h.length * 13}px`;

      if (h.length === 3) {
        w = `${h.length * 18}px`;
      } else if (h.length === 4) {
        w = `${h.length * 20}px`;
      }

      hs.push({width: w, hashtag: h})
    }

    return hs;
  }
}
