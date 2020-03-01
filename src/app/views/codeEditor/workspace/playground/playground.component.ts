import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {EnvironmentEmulatorRepository} from "../../../../repository/EnvironmentEmulatorRepository";
import { Subject, ReplaySubject } from 'rxjs';
import {HttpModel} from "../../../../model/http/HttpModel";
import {Environments} from "../../../../library/Environments";

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

  @Input('project') project: any;
  @Input('environments') environments: Environments;

  resultCommunicator: Subject<any> = new ReplaySubject();

  componentState = {
    expanded: false,
    expandedOnce: false,
    resultAvailable: false,
    resultData: null,
    expandedIcon: 'fas fa-angle-up',
    code: '',
    isRunning: false,
  };

  constructor(
    private envEmulatorRepository: EnvironmentEmulatorRepository
  ) {}

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

  onCloseResultWindow() {
    this.componentState.resultAvailable = false;
    this.componentState.resultData = null;
  }

  onRunProject(code) {
    this.componentState.isRunning = true;
    const model = HttpModel.buildAndRunProject(code.code, 'dev');

    this.envEmulatorRepository.BuildAndRunProject(this.project.uuid, model).subscribe((data: any) => {
      this.componentState.resultAvailable = true;
      this.componentState.isRunning = false;

      this.resultCommunicator.next(data);
    });
  }
}
