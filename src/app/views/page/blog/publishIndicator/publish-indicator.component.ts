import {Component, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {BlogState} from "../../../../logic/BlogState";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../../../store/page/httpActions";

@Component({
  selector: 'cms-publish-indicator',
  styleUrls: [
    './publish-indicator.component.scss',
  ],
  templateUrl: './publish-indicator.component.html',
})
export class PublishIndicatorComponent implements OnInit, OnChanges {
  @Input('appContext') appContext: AppContext;
  @Input('title') title: string;

  statusClass = '';
  statusText = '';

  disabled: boolean = false;

  constructor(
    private router: Router,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    const state: string = this.appContext.knowledgeSource.state;

    this.changeStateText(state);

    this.subscribeToHttpActions(this.store.pipe(select('pageHttpActions')));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const title: SimpleChange = changes.title;

    if (title.currentValue.length === 0) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  onPublish($event) {
    $event.stopPropagation();

    this.router.navigate(['/cms/management', 'blog', 'publish', this.appContext.knowledgeSource.shortId]);
  }

  onPreview($event) {
    $event.stopPropagation();

    window.location.href = `${environment.protocol}://${environment.bookApiUri}/cms/blog/preview/${this.appContext.knowledgeSource.slug}/${this.appContext.knowledgeSource.shortId}`;
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.HTTP_CHANGE_BLOG_STATE: {
          const state: string = action.state;

          this.changeStateText(state);
        }
      }
    });
  }

  private changeStateText(state: string) {
    if (state === BlogState.DRAFT) {
      this.statusClass = 'draft';
      this.statusText = 'DRAFT';
    } else if (state === BlogState.CHANGED) {
      this.statusClass = 'changed';
      this.statusText = 'CHANGED BUT PUBLISHED';
    } else if (state === BlogState.PUBLISHED) {
      this.statusClass = 'published';
      this.statusText = 'PUBLISHED';
    }
  }
}
