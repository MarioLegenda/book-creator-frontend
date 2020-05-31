import {Component, Input, OnInit} from '@angular/core';
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {MultimediaBlockModel} from "../../../../model/app/MultimediaBlockModel";
import {PageRepository} from "../../../../repository/PageRepository";
import {AddYoutubeLinkDialogComponent} from "../../modals/embedYoutubeLink/embed-youtube-link.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveConfirmDialogComponent} from "../../modals/removeConfirm/remove-confirm-modal.component";
import {httpRemoveBlock} from "../../../../store/page/httpActions";
import {Store} from "@ngrx/store";
import {EmbedUnsplashDialogComponent} from "../../modals/embedUnsplashImage/embed-unsplash-modal.component";
import {AppContext} from "../../../../logic/PageComponent/context/AppContext";
import {catchError, reduce} from "rxjs/operators";
import {DeviceDetectorService} from "ngx-device-detector";
import {DomSanitizer} from "@angular/platform-browser";
import {MultimediaHelpModalComponent} from "../../modals/multimediaBlock/multimedia-help-modal.component";

@Component({
  selector: 'cms-multimedia-block',
  styleUrls: [
    '../../../shared/styles/generic.component.scss',
    './multimedia-block.component.scss'
  ],
  templateUrl: './multimedia-block.component.html',
})
export class MultimediaBlockComponent implements OnInit {
  @Input('appContext') appContext: AppContext;
  @Input('component') component: MultimediaBlockModel;

  hovered: boolean = false;
  fileInfo: any = null;
  video: any = null;
  touched: boolean = false;
  unsplash: any = null;
  uploadError: any = null;
  imageTooBig: boolean = false;
  imageReadFailed: boolean = false;
  contentUploaded: boolean = false;

  constructor(
    private rebelCdnRepository: FileUploadRepository,
    private pageRepository: PageRepository,
    private dialog: MatDialog,
    private store: Store<any>,
    private fileUploadRepository: FileUploadRepository,
    private deviceDetector: DeviceDetectorService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  remove() {
    this.initRemoveFlow();
  }

  onHelp() {
    this.dialog.open(MultimediaHelpModalComponent, {
      width: '70%',
      data: {},
    });
  }

  embedUnsplashLink() {
    const dialogRef = this.dialog.open(EmbedUnsplashDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data: {original: string, id: string}) => {
      if (!data) return;

      if (this.fileInfo) {
        const model = this.createDeleteBlockImageModel();

        this.fileUploadRepository.deleteMultimediaBlockImage(model)
          .pipe(
            reduce((acc, res: any) => {
              return res.data;
            }, {}),
            // @ts-ignore
            catchError((e: any) => {
              if (Object.keys(e.error).length === 0) {
                this.uploadError = 11;
              } else {
                this.uploadError = e.error.errorCode;
              }
            })
          ).subscribe(() => {
            this.embedUnsplashFlow(data);
        });
      } else {
        this.embedUnsplashFlow(data);
      }
    });
  }

  componentTouched() {
    if (this.deviceDetector.isDesktop()) return;

    this.touched = true;
    this.hovered = true;
  }

  componentHovered() {
    if (this.touched) return;

    this.hovered = true;
  }

  componentUnHovered() {
    if (this.touched) return;

    this.hovered = false;
  }

  addYoutubeLink() {
    const dialogRef = this.dialog.open(AddYoutubeLinkDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((youtubeId: string) => {
      const model = HttpModel.updateMultimediaBlock(
        this.appContext.page.uuid,
        this.component.blockUuid,
        null,
        youtubeId,
        null,
      );

      this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
        this.unsplash = null;
        this.contentUploaded = false;
        this.video = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${res.video}`);
        this.contentUploaded = true;
      });
    });
  }

  onRemoveMultimedia() {
    this.initRemoveMultimediaFlow();
  }

  fileChange(files: FileList) {
    this.initFileChangeFlow(files);
  }

  private loadInitialData() {
    if (this.component.fileInfo) {
      this.fileInfo = this.component.fileInfo;
      this.contentUploaded = true;
    } else if (this.component.unsplash) {
      this.unsplash = this.component.unsplash;

      this.contentUploaded = true;
    } else if (this.component.video) {
      this.video = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.component.video}`);
      this.contentUploaded = true;
    }
  }

  private createUploadFileModel(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('pageData', JSON.stringify({
      fileInfo: this.fileInfo,
      pageUuid: this.appContext.page.uuid,
      blockUuid: this.component.blockUuid,
    }));

    return {
      formData: formData,
    };
  }

  private initRemoveFlow() {
    const dialogRef = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '480px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm === true) {
        this.initRemoveMultimediaFlow(true);
      }
    });
  }

  private initFileChangeFlow(files: FileList) {
    this.resetErrors();

    const reader = new FileReader();

    const file: File = files[0];
    reader.readAsDataURL(files[0]);

    reader.onload = (evn: any) => {
      const model = this.createUploadFileModel(file);

      this.fileUploadRepository.uploadMultimediaBlockImage(model).pipe(
        // @ts-ignore
        catchError((e: any) => {
          if (Object.keys(e.error).length === 0) {
            this.uploadError = 11;
          } else {
            this.uploadError = e.error.errorCode;
          }

          if (e.status === 413) {
            this.imageTooBig = true;
          }
        })
      ).subscribe((res) => {
        this.fileInfo = res;

        const model = HttpModel.updateMultimediaBlock(
          this.appContext.page.uuid,
          this.component.blockUuid,
          this.fileInfo,
          null,
          null,
        );

        this.pageRepository.updateMultimediaBlock(model).subscribe(() => {
          this.contentUploaded = true;
        });
      });
    }
  }

  private initRemoveMultimediaFlow(isBlockRemoved: boolean = false) {
    this.resetErrors();

    const pageUuid = this.appContext.page.uuid;
    const updateModel = HttpModel.updateMultimediaBlock(
      pageUuid,
      this.component.blockUuid,
      null,
      null,
      null,
    );

    if (this.fileInfo) {
      const model = this.createDeleteBlockImageModel();

      this.fileUploadRepository.deleteMultimediaBlockImage(model)
        .pipe(
          reduce((acc, res: any) => {
            return res.data;
          }, {}),
        ).subscribe(() => {
          this.removeBlock(updateModel, isBlockRemoved);
        }, () => {
        this.removeBlock(updateModel, isBlockRemoved);
      });
    } else {
      this.removeBlock(updateModel, isBlockRemoved);
    }
  }

  private createDeleteBlockImageModel() {
    const formData = new FormData();
    formData.append('fileInfo', JSON.stringify(this.fileInfo));

    return {
      formData: formData,
    };
  }

  private resetErrors() {
    this.imageReadFailed = false;
    this.uploadError = false;
    this.imageTooBig = false;
  }

  private embedUnsplashFlow(data: {original: string, id: string}) {
    const pageUuid = this.appContext.page.uuid;

    const model = HttpModel.updateMultimediaBlock(
      pageUuid,
      this.component.blockUuid,
      null,
      null,
      data.original,
    );

    this.pageRepository.updateMultimediaBlock(model).subscribe((res) => {
      this.unsplash = res.unsplash;
      this.contentUploaded = true;
      this.fileInfo = null;
      this.video = null;
    });
  }

  private removeBlock(model, isBlockRemoved: boolean): void {
    this.pageRepository.updateMultimediaBlock(model).subscribe(() => {
      this.contentUploaded = false;

      this.unsplash = null;
      this.fileInfo = null;
      this.video = null;

      if (isBlockRemoved) this.store.dispatch(httpRemoveBlock(this.component));
    });
  }
}
