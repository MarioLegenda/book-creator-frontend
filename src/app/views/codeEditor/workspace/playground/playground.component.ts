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
  @ViewChild('playgroundWrapperRef', {static: true}) playgroundWrapperRef: ElementRef;

  @Input('project') project: any;
  @Input('environments') environments: Environments;

  resultCommunicator: Subject<any> = new ReplaySubject();

  expanded: boolean = false;
  expandedOnce: boolean = false;
  resultAvailable: boolean = false;
  resultData = null;
  expandedIcon: string = 'fas fa-angle-up';
  code: string = '';
  isRunning: boolean = false;

  constructor(
    private envEmulatorRepository: EnvironmentEmulatorRepository
  ) {}

  onExpandPlayground() {
    let height = (this.expanded) ? 40 : 400;

    const el = this.playgroundWrapperRef.nativeElement;

    el.setAttribute('style', `height: ${height}px`);

    this.expanded = !this.expanded;

    this.expandedIcon = this.expanded ? 'fas fa-angle-down' : 'fas fa-angle-up';

    if (!this.expandedOnce) {
      this.expandedOnce = true;
    }
  }

  onCloseResultWindow() {
    this.resultAvailable = false;
    this.resultData = null;
  }

  onRunProject(code) {
    this.isRunning = true;
    const model = HttpModel.buildAndRunProject(code.code, 'dev');

    this.envEmulatorRepository.BuildAndRunProject(this.project.uuid, model).subscribe((data: any) => {
      this.resultAvailable = true;
      this.isRunning = false;

      this.resultCommunicator.next(data);
    });
  }
}
