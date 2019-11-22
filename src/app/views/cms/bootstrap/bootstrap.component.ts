import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageContextInitializer} from "../../../logic/PageComponent/context/PageContextInitializer";
import {ViewActionSubscriber} from "../../../logic/Subscriber/ViewActionSubscriber";
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {HttpActionSubscriber} from "../../../logic/Subscriber/HttpActionSubscriber";
import {PageContext} from "../../../logic/PageComponent/context/PageContext";

@Component({
  selector: 'cms-component',
  styleUrls: ['./bootstrap.component.scss'],
  templateUrl: './bootstrap.component.html',
  providers: [
    {
      provide: PageContext,
      useFactory: (pageContextInitializer: PageContextInitializer) => {
        return pageContextInitializer.getContext();
      },
      deps: [PageContextInitializer]
    }
  ]
})
export class BootstrapComponent implements OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private pageContext: PageContextInitializer,
    private componentTracker: ComponentTracker,
    private viewActionSubscriber: ViewActionSubscriber,
    private httpActionsSubscriber: HttpActionSubscriber,
  ) {
    pageContext.initContext(activatedRoute);
  }

  ngOnDestroy() {
    this.componentTracker.reset();
  }
}
