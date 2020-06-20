import {Component, OnInit} from '@angular/core';
import {AccountProvider} from "../../../logic/AccountProvider";
import {SubscriptionRepository} from "../../../repository/SubscriptionRepository";
import {HttpModel} from "../../../model/http/HttpModel";
import {SubscriptionMetadata} from "../../../library/SubscriptionMetadata";

@Component({
  selector: 'cms-user-section-profile',
  styleUrls: [
    './subscription.component.scss',
  ],
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent implements OnInit {
  subscriptions = [];
  noSubscriptions = null;

  constructor(
    private accountProvider: AccountProvider,
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  private loadSubscriptions(): void {
    const subscriptions: any = this.accountProvider.getAccount().subscriptions;

    if (subscriptions.length === 0) {
      this.noSubscriptions = true;

      return;
    }

    const subscriptionUuids = subscriptions.map(s => s.subscriptionUuid);

    this.subscriptionRepository.getActiveSubscriptions(HttpModel.getActiveSubscriptions(subscriptionUuids))
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
