import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageContextService} from "../../logic/PageComponent/context/PageContextService";
import {ComponentTracker} from "../../logic/PageComponent/ComponentTracker";

@Component({
  selector: 'cms-component',
  styleUrls: ['../../web/styles/cms.component.scss'],
  templateUrl: '../../web/templates/cms/cms.component.html',
})
export class BootstrapComponent implements OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private pageContext: PageContextService,
    private componentTracker: ComponentTracker
  ) {
    pageContext.initContext(activatedRoute);
  }

  ngOnDestroy() {
    this.componentTracker.reset()
  }
}
