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
  ) {
    this.account = accountProvider.getAccount();
  }

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

      this.avatarSrc = this.account.profile.avatar.path;

      this.store.dispatch(avatarChanged())
    });
  }

  onSaveProfile() {
    const uuid: string = this.account.uuid;
    let name: string = this.account.name;
    let lastName: string = this.account.lastName;
    const profile = {
      avatar: this.account.profile.avatar,
      githubProfile: this.account.profile.githubProfile,
      personalWebsite: this.account.profile.personalWebsite,
      company: this.account.profile.company,
      openSourceProject: this.account.profile.openSourceProject,
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
    this.componentState.name = this.account.name;
    this.componentState.lastName = this.account.lastName;

    const profile = this.account.profile;

    this.componentState.githubProfile = profile.githubProfile;
    this.componentState.personalWebsite = profile.personalWebsite;
    this.componentState.company = profile.company;
    this.componentState.openSourceProject = profile.openSourceProject;
  }

  private loadDefaultAvatar() {
    const avatar = this.account.profile.avatar;

    this.avatarSrc = avatar.path;
  }
}
