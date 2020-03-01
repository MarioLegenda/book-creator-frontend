import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectRepository} from "../../../repository/ProjectRepository";
import {ActivatedRoute} from "@angular/router";
import {HttpActionSubscriber} from "../../../store/subscriber/editor/HttpActionSubscriber";
import {ViewActionSubscriber} from "../../../store/subscriber/editor/ViewActionSubscriber";
import {Store} from "@ngrx/store";
import {clearStateAction} from "../../../store/globalReducers";
import Util from "../../../library/Util";
import {TabSession} from "../../../store/sessions/TabSession";
import {EnvironmentEmulatorRepository} from "../../../repository/EnvironmentEmulatorRepository";
import {Environments} from "../../../library/Environments";

@Component({
  selector: 'cms-code-editor',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit, OnDestroy, AfterViewInit {
  project: any;
  environments: Environments;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;

  constructor(
    private store: Store<any>,
    private httpActionSubscriber: HttpActionSubscriber,
    private viewActionSubscriber: ViewActionSubscriber,
    private projectRepository: ProjectRepository,
    private environmentEmulatorRepository: EnvironmentEmulatorRepository,
    private route: ActivatedRoute,
    private tabSession: TabSession,
  ) {}

  ngOnInit(): void {
    this.bootstrap().then(({project, environments}) => {
      this.environments = new Environments(environments);
      this.project = project;
    });
  }

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.project = null;

    this.httpActionSubscriber.destroy();

    this.store.dispatch(clearStateAction());

    this.tabSession.clear();
  }

  private async bootstrap() {
    const project = await this.projectRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).toPromise();
    const environments = await this.environmentEmulatorRepository.getEnvironments().toPromise();

    return {project, environments};
  }
}
