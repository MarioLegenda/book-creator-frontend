import {Component, Input, OnInit} from '@angular/core';
import {IBlogSource} from "../../../../logic/PageComponent/context/IBlogSource";
import {HttpModel} from "../../../../model/http/HttpModel";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
@Component({
  selector: 'cms-cover',
  styleUrls: [
    './cover.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './cover.component.html',
})
export class CoverComponent implements OnInit {
  @Input('appContext') appContext: AppContext;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  componentState = {
    cover: '',
    realUrl: '',
    hasCover: false,
  };

  ngOnInit() {
    this.initCover();
  }

  onChange($event) {
    if (!$event) {
      this.componentState.hasCover = false;
    }

    if ($event) {
      this.componentState.realUrl = `https://source.unsplash.com/${this.getId($event)}/1600x900`;
      this.componentState.hasCover = true;
    }

    const sourceUuid = this.appContext.knowledgeSource.uuid;

    this.blogRepository.updateBlog(HttpModel.updateBlog(
      sourceUuid,
      null,
      null,
      this.componentState.cover,
    )).subscribe(() => {});
  }

  private getId(unsplashUrl: string): string {
    const splitted = unsplashUrl.split('/');

    return splitted[4];
  }

  private initCover() {
    if (!this.appContext.knowledgeSource.cover) return;

    const original = this.appContext.knowledgeSource.cover.original;
    const real = this.appContext.knowledgeSource.cover.real;

    this.componentState.cover = original;
    this.componentState.realUrl = real;
    this.componentState.hasCover = true;
  }
}
