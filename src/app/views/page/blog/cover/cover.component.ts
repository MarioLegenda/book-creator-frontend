import {Component, Input, OnInit} from '@angular/core';
import {IBlogSource} from "../../../../logic/PageComponent/context/IBlogSource";
import {HttpModel} from "../../../../model/http/HttpModel";
import {BlogRepository} from "../../../../repository/BlogRepository";
@Component({
  selector: 'cms-cover',
  styleUrls: [
    './cover.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './cover.component.html',
})
export class CoverComponent implements OnInit {
  @Input('source') source: IBlogSource;

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

    this.blogRepository.updateBlog(HttpModel.updateBlog(
      this.source.uuid,
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
    if (!this.source.cover) return;

    this.componentState.cover = this.source.cover;
    this.componentState.realUrl = `https://source.unsplash.com/${this.getId(this.componentState.cover)}/1600x900`;
    this.componentState.hasCover = true;
  }
}
