import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

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

  componentState = {
    expanded: false,
    expandedIcon: 'fas fa-angle-up',
    editorOptions: {
      theme: 'vs-light',
      language: 'javascript',
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      }
    },
    code: '',
  };

  onExpandPlayground() {
    let height = (this.componentState.expanded) ? 40 : 400;

    const el = this.playgroundWrapperRef.nativeElement;

    el.setAttribute('style', `height: ${height}px`);

    this.componentState.expanded = !this.componentState.expanded;

    this.componentState.expandedIcon = this.componentState.expanded ? 'fas fa-angle-down' : 'fas fa-angle-up';

    console.log(this.componentState.expandedIcon);
  }
}
