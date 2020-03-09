import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {Store} from "@ngrx/store";
import {changeState} from "../../../../logic/utilFns";

@Component({
  selector: 'cms-blog-intro',
  styleUrls: [
    './blog-intro.component.scss',
    '../../shared/saved.component.scss',
  ],
  templateUrl: './blog-intro.component.html',
})
export class BlogIntroComponent implements OnInit, OnDestroy {
  model = {
    description: '',
  };

  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  // @ts-ignore
  @ViewChild('form') form;
  @Input('appContext') appContext: AppContext;

  constructor(
    private blogRepository: BlogRepository,
    private store: Store<any>,
  ) {}

  onTyping() {
    if (this.form.form.status === 'VALID') {
      this.typeAheadSource.next(this.model.description);
    }
  }

  ngOnInit() {
    this.model.description = this.appContext.knowledgeSource.description;

    this.subscribeTypeahead();
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
          null,
          this.model.description,
          null,
        )).subscribe(() => {
          changeState(this.appContext, this.store);
        });
      });
  }
}
