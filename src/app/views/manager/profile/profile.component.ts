import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountProvider} from "../../../logic/AccountProvider";
import {FileUploadRepository} from "../../../repository/FileUploadRepository";
import {catchError, reduce} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {avatarChanged, basicInfoChanged} from "../../../store/account/actions";
import {HttpModel} from "../../../model/http/HttpModel";
import {AccountRepository} from "../../../repository/AccountRepository";
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-user-section-profile',
  styleUrls: [
    '../../shared/styles/generic.component.scss',
    '../../shared/styles/form.component.scss',
    './profile.component.scss',
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private accountProvider: AccountProvider,
    private fileUploadRepository: FileUploadRepository,
    private store: Store<any>,
    private accountRepository: AccountRepository,
  ) {}

  error = null;
  imageTooBig = false;
  avatarSrc = null;
  hasFile = false;
  httpSaveError: boolean = false;

  personalDescription: string = '';
  name: string = '';
  lastName: string = '';
  githubProfile: string = '';
  twitterProfile: string = '';
  facebookProfile: string = '';
  personalWebsite: string = '';
  company: string = '';
  openSourceProject: string = '';

  inFlight: boolean = false;
  firstSave: boolean = false;
  disabled: boolean = false;

  private uploadedFile: File = null;

  private updateAccountSubscription: Subscription = null;
  private fileUploadSubscription: Subscription = null;

  ngOnInit() {
    this.loadInitialState();
    this.loadDefaultAvatar();
  }

  ngOnDestroy() {
    if (this.updateAccountSubscription) this.updateAccountSubscription.unsubscribe();
    if (this.fileUploadSubscription) this.fileUploadSubscription.unsubscribe();
  }

  onFileUpload(files: FileList) {
    this.error = null;
    this.uploadedFile = files[0];
    this.imageTooBig = false;
    this.hasFile = true;
    const reader = new FileReader();

    reader.readAsDataURL(this.uploadedFile);

    reader.onload = (e: any) => {
      this.avatarSrc = e.target.result
    }
  }

  saveFile() {
    this.disabled = true;
    const formData: FormData = new FormData();
    formData.append('file', this.uploadedFile, this.uploadedFile.name);

    const model = {
      formData: formData,
    };

    this.fileUploadRepository.uploadProfileAvatar(model).pipe(
      reduce((acc, res: any) => {
        return res.data;
      }, {}),
      // @ts-ignore
      catchError((e: any) => {
        if (Object.keys(e.error).length === 0) {
          this.error = 11;
        } else {
          this.error = e.error.errorCode;
        }

        if (e.status === 413) {
          this.imageTooBig = true;
        }

        this.hasFile = false;
        this.uploadedFile = null;

        this.disabled = false;
      })
    ).subscribe(() => {
      this.uploadedFile = null;
      this.hasFile = false;

      if (this.fileUploadSubscription) this.fileUploadSubscription.unsubscribe();
      this.fileUploadSubscription = null;

      this.fileUploadSubscription = this.accountProvider.subscribe(() => {
        const account = this.accountProvider.getAccount();

        this.avatarSrc = account.profile.avatar.path;

        this.store.dispatch(avatarChanged());

        this.disabled = false;
      });

      this.accountProvider.loadAccount();
    });
  }

  onSaveProfile() {
    if (!this.isChanged()) return;

    this.inFlight = true;
    if (!this.firstSave) {
      this.firstSave = true;
    }

    const account = this.accountProvider.getAccount();

    const uuid: string = account.uuid;
    let name: string = account.name;
    let lastName: string = account.lastName;
    const profile = {
      avatar: account.profile.avatar,
      githubProfile: account.profile.githubProfile,
      personalWebsite: account.profile.personalWebsite,
      company: account.profile.company,
      openSourceProject: account.profile.openSourceProject,
      personalDescription: account.profile.personalDescription,
      twitterProfile: account.profile.twitterProfile,
      facebookProfile: account.profile.facebookProfile,
    };

    if (this.name) {
      name = this.name;
    }

    if (this.lastName) {
      lastName = this.lastName;
    }

    profile.githubProfile = this.githubProfile;
    profile.personalWebsite = this.personalWebsite;
    profile.company = this.company;
    profile.openSourceProject = this.openSourceProject;
    profile.personalDescription = this.personalDescription;
    profile.twitterProfile = this.twitterProfile;
    profile.facebookProfile = this.facebookProfile;

    const model = HttpModel.updateAccount(
      uuid,
      name,
      lastName,
      profile,
    );

    this.accountRepository.updateAccount(model).subscribe(() => {
      this.inFlight = false;
      if (this.updateAccountSubscription) this.updateAccountSubscription.unsubscribe();
      this.updateAccountSubscription = null;

      this.updateAccountSubscription = this.accountProvider.subscribe(() => {
        this.store.dispatch(basicInfoChanged({
          name: name,
          lastName: lastName,
        }));
      });

      this.accountProvider.loadAccount();
    }, () => {
      this.httpSaveError = true;
    });
  }

  clearFile() {
    this.uploadedFile = null;
    this.hasFile = false;
    this.error = null;
    this.imageTooBig = false;
    this.loadDefaultAvatar();
  }

  private loadInitialState() {
    const account = this.accountProvider.getAccount();

    this.name = account.name;
    this.lastName = account.lastName;

    const profile = account.profile;

    this.githubProfile = profile.githubProfile;
    this.personalWebsite = profile.personalWebsite;
    this.company = profile.company;
    this.openSourceProject = profile.openSourceProject;
    this.personalDescription = profile.personalDescription;
    this.twitterProfile = profile.twitterProfile;
    this.facebookProfile = profile.facebookProfile;
  }

  private loadDefaultAvatar() {
    const avatar = this.accountProvider.getAccount().profile.avatar;

    this.avatarSrc = avatar.path;
  }

  private isChanged(): boolean {
    const account = this.accountProvider.getAccount();

    const name: string = this.name;
    const lastName: string = this.lastName;
    const githubProfile: string = this.githubProfile;
    const personalWebsite: string = this.personalWebsite;
    const company: string = this.company;
    const openSourceProject: string = this.openSourceProject;
    const personalDescription: string = this.personalDescription;
    const twitterProfile: string = this.twitterProfile;
    const facebookProfile: string = this.facebookProfile;

    if (name !== account.name) return true;
    if (lastName !== account.lastName) return true;

    const profile = account.profile;

    if (githubProfile !== profile.githubProfile) return true;
    if (personalWebsite !== profile.personalWebsite) return true;
    if (company !== profile.company) return true;
    if (openSourceProject !== profile.openSourceProject) return true;
    if (personalDescription !== profile.personalDescription) return true;
    if (twitterProfile !== profile.twitterProfile) return true;
    if (facebookProfile !== profile.facebookProfile) return true;

    return false;
  }
}
