import {Component, Input, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {IBlogSource} from "../../../../logic/PageComponent/context/IBlogSource";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {debounceTime} from "rxjs/operators";
import {HttpModel} from "../../../../model/http/HttpModel";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";

@Component({
  selector: 'cms-blog-title',
  styleUrls: [
    './blog-title.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './blog-title.component.html',
})
export class BlogTitleComponent {
  model = {
    title: '',
  };

  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  // @ts-ignore
  @ViewChild('form') form;
  @Input('appContext') appContext: AppContext;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  ngOnInit() {
    this.model.title = this.appContext.knowledgeSource.title;

    this.subscribeTypeahead();
  }

  onTyping() {
    if (this.form.form.status === 'VALID') {
      this.typeAheadSource.next(this.model.title);
    }
  }

  ngOnDestroy() {
    this.typeAheadObservable.unsubscribe();
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        const sourceUuid = this.appContext.knowledgeSource.uuid;

        this.blogRepository.updateBlog(HttpModel.updateBlog(
          sourceUuid,
          this.model.title,
          null,
          null,
        )).subscribe(() => {
        });
      });
  }
}
