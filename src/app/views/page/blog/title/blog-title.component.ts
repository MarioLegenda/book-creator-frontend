import {Component, Input, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {IBlogSource} from "../../../../logic/PageComponent/context/IBlogSource";
import {BlogRepository} from "../../../../repository/BlogRepository";
import {debounceTime} from "rxjs/operators";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-blog-title',
  styleUrls: ['./blog-title.component.scss'],
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
  @Input('source') source: IBlogSource;

  constructor(
    private blogRepository: BlogRepository,
  ) {}

  onTyping() {
    if (this.form.form.status === 'VALID') {
      this.typeAheadSource.next(this.model.title);
    }
  }

  ngOnInit() {
    this.model.title = this.source.title;

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
          this.model.title,
          null,
        )).subscribe(() => {});
      });
  }
}
