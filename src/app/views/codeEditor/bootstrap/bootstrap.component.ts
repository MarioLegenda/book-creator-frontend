import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectRepository} from "../../../repository/ProjectRepository";
import {ActivatedRoute} from "@angular/router";
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";
import {CodeProjectAppModel} from "../../../model/app/codeEditor/CodeProjectAppModel";
import {HttpActionSubscriber} from "../../../store/subscriber/editor/HttpActionSubscriber";
import {ViewActionSubscriber} from "../../../store/subscriber/editor/ViewActionSubscriber";
import {Store} from "@ngrx/store";
import {clearStateAction} from "../../../store/globalReducers";
import Util from "../../../library/Util";

@Component({
  selector: 'cms-code-editor',
  styleUrls: [
    './bootstrap.component.scss',
  ],
  templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent implements OnInit, OnDestroy, AfterViewInit {
  project: CodeProjectAppModel;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;

  constructor(
    private store: Store<any>,
    private httpActionSubscriber: HttpActionSubscriber,
    private viewActionSubscriber: ViewActionSubscriber,
    private projectRepository: ProjectRepository,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.projectRepository.getProjectByShortId(this.route.snapshot.paramMap.get('shortId')).subscribe((model: CodeProjectHttpModel) => {
      this.project = model.convertToAppModel();
    });
  }

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.httpActionSubscriber.destroy();
    this.viewActionSubscriber.destroy();

    this.store.dispatch(clearStateAction());
  }
}
