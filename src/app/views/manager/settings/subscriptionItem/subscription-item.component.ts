import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionRepository} from "../../../../repository/SubscriptionRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {UnsubscribeDialog} from "../../modals/unsubscribeDialog/unsubscribe-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SubscriptionState} from "../../../../library/SubscriptionState";

@Component({
  selector: 'cms-subscription-item',
  styleUrls: [
    './subscription-item.component.scss',
  ],
  templateUrl: './subscription-item.component.html',
})
export class SubscriptionItem {
  @Input('subscriptionMetadata') subscriptionMetadata: any;

  status = null;
  subscription = null;
  selected: boolean = false;
  requestInFlight: boolean = false;

  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.status = this.subscriptionMetadata.status;
  }

  onSelectEntry() {
    if (this.requestInFlight) return;

    this.selected = !this.selected;

    if (this.subscription) return;

    this.requestInFlight = true;

    const model = HttpModel.getStripeSubscription(this.subscriptionMetadata.subscriptionId);

    this.subscriptionRepository.getStripeSubscription(model).subscribe((subscription) => {
      this.subscription = subscription;

      this.requestInFlight = false;
    });
  }

  onUnsubscribe() {
    if (this.subscriptionMetadata.status === SubscriptionState.PENDING_UNSUBSCRIPTION) return;

    const dialogRef = this.dialog.open(UnsubscribeDialog, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;

      const model = HttpModel.updateSubscriptionStatus(
        this.subscriptionMetadata.uuid,
        SubscriptionState.PENDING_UNSUBSCRIPTION,
      );

      this.subscriptionRepository.updateSubscriptionStatus(model).subscribe(() => {
        this.status = SubscriptionState.PENDING_UNSUBSCRIPTION;
      });
    });
  }

  parseDuration(interval: string): string {
    if (interval === 'month') return 'monthly';
    if (interval === 'year') return 'annually';

    return '';
  }

  parseCost(cost: number): number {
    return cost / 100;
  }

  parseCurrency(currency: string): string {
    return currency.toUpperCase();
  }

  parseStatus(status: string): string {
    if (status === SubscriptionState.ACTIVE) {
      return 'active';
    }

    if (status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      return 'unsubscribed but active'
    }

    return '';
  }

  parseStatusClass(status: string) {
    if (status === SubscriptionState.ACTIVE) {
      return 'active-status';
    }

    if (status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      return 'pending-status'
    }

    return '';
  }

  parseStatusButtonClass(status: string): string {
    if (status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      return 'button-disabled';
    }

    return '';
  }
}
