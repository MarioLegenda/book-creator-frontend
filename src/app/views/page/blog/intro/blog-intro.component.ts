import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {IBlogSource} from "../../../../logic/PageComponent/context/IBlogSource";
import {HttpModel} from "../../../../model/http/HttpModel";

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
  @Input('source') source: IBlogSource;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  onTyping() {
    if (this.form.form.status === 'VALID') {
      this.typeAheadSource.next(this.model.description);
    }
  }

  ngOnInit() {
    this.model.description = this.source.description;

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
        this.blogRepository.updateBlog(HttpModel.updateBlog(
          this.source.uuid,
          null,
          this.model.description,
          null,
        )).subscribe(() => {
        });
      });
  }
}
