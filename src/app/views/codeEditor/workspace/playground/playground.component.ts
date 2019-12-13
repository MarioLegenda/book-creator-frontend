import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CodeProjectAppModel} from "../../../../model/app/codeEditor/CodeProjectAppModel";

@Component({
  selector: 'cms-playground',
  styleUrls: [
    './playground.component.scss',
  ],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {
  // @ts-ignore
  @ViewChild('playgroundWrapperRef') playgroundWrapperRef: ElementRef;

  @Input('project') project: CodeProjectAppModel;

  componentState = {
    expanded: false,
    expandedOnce: false,
    expandedIcon: 'fas fa-angle-up',
    code: '',
  };

  onExpandPlayground() {
    let height = (this.componentState.expanded) ? 40 : 400;

    const el = this.playgroundWrapperRef.nativeElement;

    el.setAttribute('style', `height: ${height}px`);

    this.componentState.expanded = !this.componentState.expanded;

    this.componentState.expandedIcon = this.componentState.expanded ? 'fas fa-angle-down' : 'fas fa-angle-up';

    if (!this.componentState.expandedOnce) {
      this.componentState.expandedOnce = true;
    }
  }
}
