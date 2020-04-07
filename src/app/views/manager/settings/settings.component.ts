import {Component, OnInit} from '@angular/core';
import {AccountProvider} from "../../../logic/AccountProvider";
import {SubscriptionRepository} from "../../../repository/SubscriptionRepository";
import {HttpModel} from "../../../model/http/HttpModel";
import {SubscriptionMetadata} from "../../../library/SubscriptionMetadata";

@Component({
  selector: 'cms-user-section-profile',
  styleUrls: [
    './settings.component.scss',
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  subscriptions = [];
  noSubscriptions = null;

  constructor(
    private accountProvider: AccountProvider,
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  ngOnInit() {
    //this.loadSubscriptions();
  }

  private loadSubscriptions(): void {
    const subscriptions = this.accountProvider.getAccount().subscriptions;

    if (subscriptions.length === 0) {
      this.noSubscriptions = true;

      return;
    }

    this.subscriptionRepository.getActiveSubscriptions(HttpModel.getActiveSubscriptions(subscriptions))
      .subscribe((res) => {
        if (res.length === 0) {
          this.noSubscriptions = true;

          return;
        }

        const subscriptionMetadata: SubscriptionMetadata = new SubscriptionMetadata();

        for (const s of res) {
          let subMetadata = subscriptionMetadata.getSettingsListMetadata(s.subscriptionName);
          subMetadata = {...subMetadata, ...s};

          this.subscriptions.push(subMetadata);
        }
      });
  }
}
