import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogRepository} from "../../../repository/BlogRepository";
import {MiscRepository} from "../../../repository/MiscRepository";
import {CodeProjectsRepository} from "../../../repository/CodeProjectsRepository";
import {environment} from "../../../../environments/environment";
import {HttpModel} from "../../../model/http/HttpModel";
import {EnvironmentEmulatorRepository} from "../../../repository/EnvironmentEmulatorRepository";
import {BlogState} from "../../../logic/BlogState";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'cms-publish-blog',
  styleUrls: [
    '../../shared/styles/generic.component.scss',
    './publish.component.scss',
  ],
  templateUrl: './publish.component.html',
})
export class PublishComponent implements OnInit, OnDestroy {
  blog: any = null;
  hashtags: any = null;
  filteredHashtags: any = [];
  searchedHashtag: string = '';
  selectedTags = [];
  noHtagsSelected: boolean = false;
  publishInProgress: boolean = false;

  publishedUrl: string = null;
  codeProjects: any[] = [];

  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  constructor(
    private blogRepository: BlogRepository,
    private miscRepository: MiscRepository,
    private codeProjectsRepository: CodeProjectsRepository,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
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

        this.hashtags = data.hashtags;
        this.filteredHashtags = this.loadHashtags(data.hashtags);
        this.selectedTags = this.loadHashtags(this.blog.hashtags);

        return;
      }

      if (type === 'fail') {
        if (data.status === 404) return this.redirectTo404();

        return this.redirectTo500();
      }
    });

    this.subscribeTypeahead();
  }

  ngOnDestroy(): void {
    this.typeAheadObservable.unsubscribe();
  }

  onFilterHashtags() {
    this.typeAheadSource.next(this.searchedHashtag);
  }

  onHashtagSelect(hashtag) {
    if (this.isHashtagSelected(hashtag)) return;

    this.noHtagsSelected = false;

    if (this.selectedTags.length < 5) {
      this.selectedTags.push(hashtag);
    }
  }

  onRemoveHashtag(idx: number) {
    this.selectedTags.splice(idx, 1);
  }

  onPublish() {
    this.noHtagsSelected = false;
    if (this.selectedTags.length === 0) {
      this.noHtagsSelected = true;

      return;
    }

    this.publishInProgress = true;
    this.publicAction().then(() => {
      this.publishInProgress = false;

      this.redirectToProdSource();
    });
  }

  onPreview($event) {
    $event.stopPropagation();

    window.location.href = `${environment.protocol}://${environment.bookApiUri}/cms/blog/preview/${this.blog.slug}/${this.blog.shortId}`;
  }

  private isHashtagSelected(hashtag): boolean {
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

  private redirectToProdSource(): void {
    window.location.href = `${environment.protocol}://${environment.bookApiUri}/blog/${this.blog.slug}/${this.blog.shortId}`;
  }

  private loadHashtags(hashtags: string[]) {
    const hs = [];
    for (const h of hashtags) {
      let w = `${h.length * 11}px`;

      if (h.length === 3) {
        w = `${h.length * 18}px`;
      } else if (h.length === 4) {
        w = `${h.length * 16}px`;
      } else if (h.length === 5) {
        w = `${h.length * 15}px`;
      } else if (h.length === 6) {
        w = `${h.length * 17}px`;
      }

      hs.push({width: w, hashtag: h})
    }

    return hs;
  }

  private async publicAction() {
    const hashtags = this.selectedTags.map(h => h.hashtag);

    const state = this.blog.state;
    const publishModel = HttpModel.publish(this.blog.uuid, hashtags);
    const buildStateModel = HttpModel.buildState('prod', this.blog.uuid, 'blog');

    if (this.blog.codeProjects.length > 0 && state === BlogState.CHANGED) {
      await this.environmentEmulatorRepository.buildState(buildStateModel).toPromise();
    }

    return await this.blogRepository.changeState(publishModel).toPromise();
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource
      .subscribe(() => {
        if (!this.searchedHashtag) {
          return this.filteredHashtags = this.loadHashtags(this.hashtags);
        }
        
        const re = new RegExp(`${this.searchedHashtag}`, 'i');

        const filtered = this.hashtags.filter(h => re.test(h));

        this.filteredHashtags = this.loadHashtags(filtered);
      });
  }
}