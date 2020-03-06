import {Component, OnInit} from '@angular/core';
import {BlogRepository} from "../../../repository/BlogRepository";
import {MiscRepository} from "../../../repository/MiscRepository";

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

  constructor(
    private blogRepository: BlogRepository,
    private miscRepository: MiscRepository,
  ) {}

  ngOnInit() {
    const split = location.pathname.split('/');
    const shortId = split[split.length - 1];

    if (!shortId) this.redirectTo404();

    this.getInitialData(shortId).then(({type, data}) => {
      if (type === 'ok') {
        this.blog = data.blog;
        this.hashtags = data.hashtags;

        return;
      }

      if (type === 'fail') {
        if (data.status === 404) return this.redirectTo404();

        return this.redirectTo500();
      }
    });
  }

  private async getInitialData(shortId: string) {
    try {
      const uuid: any = await this.blogRepository.getUuid(shortId).toPromise();

      const blog = await this.blogRepository.getBlog(uuid.data.uuid).toPromise();
      const hashtags = await this.miscRepository.getHashtags().toPromise();

      return {
        type: 'ok',
        data: {blog, hashtags},
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
