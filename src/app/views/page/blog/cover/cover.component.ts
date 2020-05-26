import {Component, Input, OnInit} from '@angular/core';
import {HttpModel} from "../../../../model/http/HttpModel";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {Store} from "@ngrx/store";
import {changeState} from "../../../../logic/utilFns";
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
    private store: Store<any>,
  ) {}

  cover: any = '';
  realUrl: string = '';
  hasCover: boolean = false;

  ngOnInit() {
    this.initCover();
  }

  onChange($event) {
    if (!$event) {
      this.hasCover = false;
      this.cover = '';
      this.realUrl = '';
    }

    if ($event) {
      this.hasCover = true;
    }

    const sourceUuid = this.appContext.knowledgeSource.uuid;

    console.log(this.cover);

    this.blogRepository.updateBlog(HttpModel.updateBlog(
      sourceUuid,
      null,
      null,
      this.cover,
    )).subscribe((blog) => {
      const cover = blog.cover;

      if (!cover) return;

      this.realUrl = cover.default;

      changeState(this.appContext, this.store);
    });
  }

  private initCover() {
    if (!this.appContext.knowledgeSource.cover) return;

    const original = this.appContext.knowledgeSource.cover.original;
    const real = this.appContext.knowledgeSource.cover.default;

    this.cover = original;
    this.realUrl = real;
    this.hasCover = true;
  }
}
