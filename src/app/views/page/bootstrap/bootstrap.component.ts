import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppContextInitializer} from "../../../logic/PageComponent/context/AppContextInitializer";
import {ViewActionSubscriber} from "../../../store/subscriber/page/ViewActionSubscriber";
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {HttpActionSubscriber} from "../../../store/subscriber/page/HttpActionSubscriber";

@Component({
  selector: 'cms-component',
  styleUrls: ['./bootstrap.component.scss'],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private appContextInitializer: AppContextInitializer,
    private componentTracker: ComponentTracker,
    private viewActionSubscriber: ViewActionSubscriber,
    private httpActionsSubscriber: HttpActionSubscriber,
  ) {
    appContextInitializer.initContext(activatedRoute);
  }

  ngOnDestroy() {
    this.appContextInitializer.destroy();
    this.componentTracker.destroy();
  }
}
