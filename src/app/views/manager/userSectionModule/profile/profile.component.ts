import {Component} from '@angular/core';
import {AccountProvider} from "../../../../logic/AccountProvider";
import {FileUploadRepository} from "../../../../repository/FileUploadRepository";
import {catchError, last, reduce} from "rxjs/operators";
import {Account} from "../../../../model/app/Account";
import {Store} from "@ngrx/store";
import {avatarChanged, basicInfoChanged} from "../../../../store/account/actions";
import {HttpModel} from "../../../../model/http/HttpModel";
import {AccountRepository} from "../../../../repository/AccountRepository";

@Component({
  selector: 'cms-user-section-profile',
  styleUrls: [
    '../../../shared/styles/generic.component.scss',
    './profile.component.scss',
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(
    private accountProvider: AccountProvider,
    private fileUploadRepository: FileUploadRepository,
    private store: Store<any>,
    private accountRepository: AccountRepository,
  ) {}

  error = null;
  imageTooBig = false;
  avatarSrc = null;

  componentState = {
    name: '',
    lastName: '',
    githubProfile: '',
    personalWebsite: '',
    company: '',
    openSourceProject: '',
  };

  private uploadedFile: File = null;
  private account: Account;

  ngOnInit() {
    this.loadInitialState();
    this.loadDefaultAvatar();
  }

  onFileUpload(files: FileList) {
    this.error = null;
    this.uploadedFile = files[0];
    this.imageTooBig = false;
    const reader = new FileReader();

    reader.readAsDataURL(this.uploadedFile);

    reader.onload = (e: any) => {
      this.avatarSrc = e.target.result
    }
  }

  saveFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.uploadedFile, this.uploadedFile.name);

    const model = {
      formData: formData,
    };

    this.fileUploadRepository.uploadFile(model).pipe(
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

        this.uploadedFile = null;
      })
    ).subscribe((res: any) => {
      this.uploadedFile = null;

      this.accountProvider.updateProfileAvatar(res.profile.avatar);

      this.avatarSrc = this.accountProvider.getAccount().profile.avatar.path;

      this.store.dispatch(avatarChanged())
    });
  }

  onSaveProfile() {
    if (!this.isChanged()) return;

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
    };

    if (this.componentState.name) {
      name = this.componentState.name;
    }

    if (this.componentState.lastName) {
      lastName = this.componentState.lastName;
    }

    profile.githubProfile = this.componentState.githubProfile;
    profile.personalWebsite = this.componentState.personalWebsite;
    profile.company = this.componentState.company;
    profile.openSourceProject = this.componentState.openSourceProject;

    const model = HttpModel.updateAccount(
      uuid,
      name,
      lastName,
      profile,
    );

    this.accountRepository.updateAccount(model).subscribe((account) => {
      const name = account.name;
      const lastName = account.lastName;
      const profile = account.profile;

      this.accountProvider.updateBasicData(name, lastName);

      this.store.dispatch(basicInfoChanged({
        name: name,
        lastName: lastName,
      }));

      this.accountProvider.updateProfile(
        profile.githubProfile,
        profile.personalWebsite,
        profile.company,
        profile.openSourceProject,
      );
    });
  }

  clearFile() {
    this.uploadedFile = null;
    this.error = null;
    this.imageTooBig = false;
    this.loadDefaultAvatar();
  }

  private loadInitialState() {
    const account = this.accountProvider.getAccount();

    this.componentState.name = account.name;
    this.componentState.lastName = account.lastName;

    const profile = account.profile;

    this.componentState.githubProfile = profile.githubProfile;
    this.componentState.personalWebsite = profile.personalWebsite;
    this.componentState.company = profile.company;
    this.componentState.openSourceProject = profile.openSourceProject;
  }

  private loadDefaultAvatar() {
    const avatar = this.accountProvider.getAccount().profile.avatar;

    this.avatarSrc = avatar.path;
  }

  private isChanged(): boolean {
    const account = this.accountProvider.getAccount();

    const name = this.componentState.name;
    const lastName = this.componentState.lastName;
    const githubProfile = this.componentState.githubProfile;
    const personalWebsite = this.componentState.personalWebsite;
    const company = this.componentState.company;
    const openSourceProject = this.componentState.openSourceProject;

    if (name !== account.name) return true;
    if (lastName !== account.lastName) return true;

    const profile = account.profile;

    if (githubProfile !== profile.githubProfile) return true;
    if (personalWebsite !== profile.personalWebsite) return true;
    if (company !== profile.company) return true;
    if (openSourceProject !== profile.openSourceProject) return true;

    return false;
  }
}
