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

  model: string = '';
  cover: any = null;
  hasCover: boolean = false;

  ngOnInit() {
    this.initCover();
  }

  onChange() {
    this.hasCover = false;
    this.cover = null;

    const sourceUuid = this.appContext.knowledgeSource.uuid;

    this.blogRepository.updateBlog(HttpModel.updateBlog(
      sourceUuid,
      null,
      null,
      this.model,
    )).subscribe((blog) => {
      const cover = blog.cover;

      if (!cover) return;

      this.cover = cover;
      this.model = cover.original;
      this.hasCover = true;

      changeState(this.appContext, this.store);
    });
  }

  private initCover(): void {
    if (!this.appContext.knowledgeSource.cover) return;

    this.cover = this.appContext.knowledgeSource.cover;
    this.model = this.cover.original;
    this.hasCover = true;
  }
}
