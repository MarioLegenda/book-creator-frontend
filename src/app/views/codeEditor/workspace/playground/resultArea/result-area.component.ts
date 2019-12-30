import {Component, EventEmitter, Output, Input, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'cms-result-area',
  styleUrls: [
    './result-area.component.scss',
  ],
  templateUrl: './result-area.component.html',
})
export class ResultAreaComponent {
  @Input('result') result;
  // @ts-ignore
  @ViewChild('resultAreaRef') resultAreaRef: ElementRef;

  componentState = {
    minimized: false,
    icons: {
      minimize: "fa fa-minus",
    }
  }

  onMinimize() {
    if (this.componentState.minimized) {
      this.resultAreaRef.nativeElement.setAttribute('style', 'height: 200px');
      this.resultAreaRef.nativeElement.setAttribute('style', 'top: 200px');

      this.componentState.minimized = false;

      this.componentState.icons.minimize = 'fa fa-minus';
    } else if (!this.componentState.minimized) {
      this.resultAreaRef.nativeElement.setAttribute('style', 'height: 30px');
      this.resultAreaRef.nativeElement.setAttribute('style', 'top: 370px');

      this.componentState.minimized = true;

      this.componentState.icons.minimize = 'far fa-window-maximize';
    }
  }
}
